import { addDetailController } from './addDetailController.js'
import { notificationController } from '../notifications/notificationsController.js'


//Reading queryparam from url
const params = new URLSearchParams(window.location.search);
const addId = params.get('addId');   

if (!addId) {                       //Validation that addId exists  
    window.location = '/'
}else {
    const addDetailElement = document.querySelector('.addDetail');
    addDetailController(addDetailElement, addId)
}
