export class Module {

    id;
    name;
    state;
    description;

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getState(){
        return this.state;
    }

    getDescription(){
        return this.description;
    }

    setDescription(description){
        this.description = description;
    }
}