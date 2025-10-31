import { makeObservable, observable, action } from 'mobx';

export class BaseModel {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;

    constructor(id: string, name: string = '') {
        this.id = id;
        this.name = name;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();

        makeObservable(this, {
            name: observable,
            updateName: action,
        });
    }

    updateName(newName: string): void {
        this.name = newName;
        this.updatedAt = new Date().toISOString();
    }
}
