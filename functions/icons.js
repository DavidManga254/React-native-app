//function to return icon name
export function iconMaker(name){
    if(name.includes('PC')){
        return 'microsoft-windows'
    }
    else if(name.includes('PlayStation')){
        return 'sony-playstation'
    }
    else if(name.includes('Xbox')){
        return 'microsoft-xbox'
    }
    else if(name.includes('Nintendo')){
        return 'nintendo-switch'
    }
}