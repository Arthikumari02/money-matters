import { makeObservable, observable, action } from 'mobx';

export abstract class BaseModel {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;

    constructor(data: { id: string; name: string; createdAt: string; updatedAt: string }) {
        this.id = data.id;
        this.name = data.name;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;

        makeObservable(this, {
            id: observable,
            name: observable,
            createdAt: observable,
            updatedAt: observable,
            updateName: action,
        });
    }

    abstract updateName(newName: string): Promise<boolean>;
}
