import {Ok, Err, Result} from 'ts-results';

enum DataGetError {
    NoDate = "NoDate",
    BadDate = "BadDate",
    NoAuxillary = "NoAuxillary",
    BadAuxillary = "BadAuxillary",
    NetworkError = "NetworkError",
}

export class DataManager {
    initial_date: number = 0;
    private moving_avg_length: number = 3;

    dates: number[] = [];

    temps: number[] = [];
    avg_temps: number[] = [];

    humidities: number[] = [];
    avg_humidities: number[] = [];

    lights: number[] = [];
    avg_lights: number[] = [];

    pressures: number[] = [];
    avg_pressures: number[] = [];

    wind_speeds: number[] = [];
    avg_wind_speeds: number[] = [];

    constructor() {

    }

    private static getSrcReflect(source: number[], idx: number): number {
        if(idx < 0) {
            return source[0];
        } else if (idx >= source.length) {
            return source[source.length - 1];
        } else {
            return source[idx];
        }
    }

    private calculateMovingAverage(source: number[], dest: number[]) {
        let avg = 0;
        for (let i = 0; i < source.length; i++) {
            let avg = 0;
            for (let j = i - (this.moving_avg_length - 1)/2; 
                 j <= i + (this.moving_avg_length - 1)/2; 
                 j++
            ) {
                avg += DataManager.getSrcReflect(source, j); 
            }
            avg /= this.moving_avg_length;
            dest[i] = avg;
        }
       
    }

    public recalcAvgs() {
        this.calculateMovingAverage(this.temps, this.avg_temps);
        this.calculateMovingAverage(this.humidities, this.avg_humidities);
        this.calculateMovingAverage(this.lights, this.avg_lights);
        this.calculateMovingAverage(this.pressures, this.avg_pressures);
        this.calculateMovingAverage(this.wind_speeds, this.avg_wind_speeds);
    }

    public setMovingAvgLength(length: number) {
        this.moving_avg_length = length;
        this.recalcAvgs();
    }

    public getMovingAvgLength() {
        return this.moving_avg_length;
    }

    public resetData(): void {
        this.initial_date = 0;
        this.dates.length = 0;
        this.temps.length = 0;
        this.humidities.length = 0;
        this.lights.length = 0;
        this.pressures.length = 0;
        this.wind_speeds.length = 0;
        this.recalcAvgs();
    }

    public async update(): Promise<Result<DataPacket, DataGetError>> {
        try {
            let data_packet_res = await requestData();
            if (!data_packet_res.ok)
                return data_packet_res;
            let data_packet = data_packet_res.val;

            let add_to_data = false;

            if (this.dates.length == 0) {
                this.initial_date = data_packet.date;    
                add_to_data = true;
            } else if (data_packet.date - this.initial_date != this.dates[this.dates.length - 1]) {
                add_to_data = true;
            }

            if (add_to_data) {
                this.dates.push(data_packet.date - this.initial_date);
                this.temps.push(data_packet.temp_celsius);
                this.humidities.push(data_packet.humidity_rh);
                this.lights.push(data_packet.light_lx);
                this.pressures.push(data_packet.pressure_pa);
                this.wind_speeds.push(data_packet.wind_speed_kmh);
                this.recalcAvgs();
            }
            return data_packet_res;
        } catch (err) {
            return Err(DataGetError.NetworkError);
        }
    }
}

let checkData = function (data: any): Result<null, DataGetError> {
    if (data == undefined) 
        return Err(DataGetError.NoAuxillary);
    if (typeof data != "number" || data <= 0)
        return Err(DataGetError.BadAuxillary);
    return Ok((null));
}

export class DataPacket {
    date: number = 0;
    temp_celsius: number = 0;
    humidity_rh: number = 0;
    light_lx: number = 0;
    pressure_pa: number = 0;
    wind_speed_kmh: number = 0;

    constructor(
        date: number,
        temp_celsius: number,
        humidity_rh: number,
        light_lx: number,
        pressure_pa: number,
        wind_speed_kmh: number,
    ) {
        this.date = date;
        this.temp_celsius = temp_celsius;
        this.humidity_rh = humidity_rh;
        this.light_lx = light_lx;
        this.pressure_pa = pressure_pa;
        this.wind_speed_kmh = wind_speed_kmh;
    }

    public static fromJSON(jsonObj: any): Result<DataPacket, DataGetError> {
        let date = 0;
        let temp_celsius = 0;
        let humidity_rh = 0;
        let light_lx = 0;
        let pressure_pa = 0;
        let wind_speed_kmh = 0;

        date = jsonObj?.date;
        if (date == undefined) 
            return Err(DataGetError.NoDate);
        if (typeof date != "number" || date <= 0)
            return Err(DataGetError.BadDate);

        temp_celsius = jsonObj?.temp_celsius;
        let data_check = checkData(temp_celsius);
        if(!data_check.ok)
            return Err(data_check.val as DataGetError);

        humidity_rh = jsonObj?.humidity_rh;
        data_check = checkData(humidity_rh);
        if(!data_check.ok)
            return Err(data_check.val as DataGetError);

        light_lx = jsonObj?.light_lx;
        data_check = checkData(light_lx);
        if(!data_check.ok)
            return Err(data_check.val as DataGetError);

        pressure_pa = jsonObj?.pressure_pa;
        data_check = checkData(pressure_pa);
        if(!data_check.ok)
            return Err(data_check.val as DataGetError);

        wind_speed_kmh = jsonObj?.wind_speed_kmh;
        data_check = checkData(wind_speed_kmh);
        if(!data_check.ok)
            return Err(data_check.val as DataGetError);

        let packet = new DataPacket(
            date,
            temp_celsius,
            humidity_rh,
            light_lx,
            pressure_pa,
            wind_speed_kmh,
        );
        return Ok(packet);
    }
}

export let corsURL = "http://localhost:1234";

export let requestData = async (): Promise<Result<DataPacket, DataGetError>> => {
    return fetch(corsURL)
        .then(res => res.json())
        .then(jsonObj => DataPacket.fromJSON(jsonObj))
        .catch(error => Err(DataGetError.NetworkError))
}
