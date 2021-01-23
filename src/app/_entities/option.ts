export class Option {
    id: string;
    valueText: string;
    valueAudio: string;

    constructor(id: string, valueText: string, valueAudio: string) {
        this.id = id;
        this.valueText = valueText;
        this.valueAudio = valueAudio;
    }
}
