import { getAdds, statusAddsList } from './adds.js'
import { buildAddView } from './addsView.js'
import { buildSpinnerView, hideSpinner } from '../utils/SpinnerView.js';
import { pubSub } from '../pubSub.js'


export async function addsListController(addListElement, spinnerElement) {
    //Ruleta de carga
    //addListElement.classList.replace('adds-list', 'spinnerView')
    spinnerElement.innerHTML = buildSpinnerView(spinnerElement); 
    let adds = [];
     
    try {
        adds = await getAdds();

        //dispatchCustomEvent({ isError: false, message: 'Los anuncios se han cargado correctamente' }, addListElement)
        
        if (adds.length >0) {
            
            drawAdds(adds, addListElement) 
            pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, 'Los anuncios se han cargado correctamente');
            console.log(statusAddsList)
            
        } else {
            pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, 'No hay anuncios disponibles, todavía...');
            //dispatchCustomEvent({isError: true, message: 'No hay anuncios disponibles, todavía...' }, addListElement)
        }
    } catch (err) {
        pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, 'No hemos podido cargar los anuncios. Inténtelo de nuevo más tarde.')
        
    }finally {
        //addListElement.classList.replace('spinnerView', 'adds-list')
        hideSpinner(spinnerElement)
    }
}

function drawAdds(adds, addListElement) {                   
    for (const add of adds) {       
        const newAddElement = buildAddView(add);
        addListElement.appendChild(newAddElement);          
    }
}

/*function dispatchCustomEvent(details, addListElement){
    const event = new CustomEvent('newNotification', {
        detail: details
    })

    addListElement.dispatchEvent(event)                     //Lanza el evento customizado que hemos creado
}*/
