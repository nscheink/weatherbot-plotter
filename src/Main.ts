import {PlotManager} from './DataPlotter';
import {DataManager, DataPacket} from './DataManager';

export let delay = async function(milliseconds: number): Promise<void>{
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
export let mainApp = async function(
    eraseButton: HTMLButtonElement,
    avgSlider: HTMLInputElement,
    avgText: HTMLParagraphElement,
    tempCanvas: HTMLCanvasElement,
    pressureCanvas: HTMLCanvasElement,
    humidityCanvas: HTMLCanvasElement,
    lightCanvas: HTMLCanvasElement,
    speedCanvas: HTMLCanvasElement
) {
    let dataManager = new DataManager();
    let plotManager = new PlotManager(
        dataManager, 
        eraseButton, 
        avgSlider,
        avgText,
        tempCanvas, 
        pressureCanvas,
        humidityCanvas,
        lightCanvas,
        speedCanvas,
    );
    
    let old_date = 0;
    while(true) {
        let packet = await dataManager.update();
        if (!packet.ok) {
            console.log("Data Update Error!", packet.val);
        } else {
            let data = packet.val as DataPacket;
            if (data.date != old_date) {
                old_date = data.date;
                plotManager.updateData();
            }
        }
        await delay(2000);
    }
}
