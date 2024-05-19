import { MyUser } from './creationUser.js'   
// MyUser
console.log(MyUser)

import { Message } from '/Message.js'

export class MessageController {
    messages = [];
    constructor(){
        this.message = new Message();
    }

    createMessage(data){
        const ElementMessage = this.message.createMessage(data);
        ElementMessage.classList.add('newMsg');
        const Message = {            
            data: data,
            element: ElementMessage,
        }
        this.addUltimateMsgClass();
        this.removeNewMsgClassFromAllMessages();
        this.messages.push(Message);
    }
    // -----------------------------
    // falta crear ademas una fucntion 
    // que actualize las reactions del mensaje que hara el backend:
    // fucntion updateReaction( data, type);
    updateReaction(data) {
        const { id, ContainReactiosn, reactions } = data; 
        const messageUpdate = this.findMessageById(id);
        if(ContainReactiosn){
            // tenemos que crear o update reacciones 
            const sectionReactions = messageUpdate.querySelector(".")
            if(sectionReactions){
                // si existe solo debemos 
                // de comprobar si estan las racciones
                // si esta la reaccion pues actualizamos las face
                // sino esta la reaccion pues creamos la seccion de la reaccion
               
               // seria mejor un foreach del reactions.type == "like"
                for (let index = 0; index < reactions.length; index++) {
                    //const element = array[index];
                    // recorre reactions y mira si esta
                    // el reactions.name y el div con el atributo 
                    // si existe like pero no dislike habria que crear dislike y actualizar like 
                    // pero si existe dislike y no tenemos que crear dislike pues debemos de eliminarlo
                    // osea las reacciones que existan en el mensage que no esten en el reactions deben de ser eliminadas.
            
                    const reaccionExiste = sectionReactions.querySelector(".[type = type]");
                    if(reaccionExiste){
                        // si existe actualizamos la 
                        //reaccionimg perfil o eliminamos si la
                        // reaccion es menor a la actual o
                        // eliminamos la seccion si ya no hay reacciones
                    } else{
                        // sino existe la reaccion creamos la seccion de la reaccion 
                    } 
                }
            }
        }else {
            // tenemos que borrar el container de reacciones
        }
    }
    addUltimateMsgClass() {

        this.removeUltimateMsgClassFromAllMessages();

        // Variable para seguir si ya se ha encontrado el primer mensaje
        let firstMessageFound = false;
    
        // Itera sobre cada mensaje en messages
        this.messages.forEach(message => {
            // Si el primer mensaje aún no se ha encontrado
            if (!firstMessageFound) {
                // Añade la clase 'ulimatemsg' al elemento de mensaje
                message.element.classList.add('ultimateMsg');
                
                // Marca que se ha encontrado el primer mensaje
                firstMessageFound = true;
            }
        });
    }
    removeUltimateMsgClassFromAllMessages() {
        // Itera sobre cada mensaje en this.messages
        this.messages.forEach(message => {
            // Elimina la clase 'newmsg' del elemento de mensaje
            message.element.classList.remove('ultimateMsg');
        });
    }

    

    removeNewMsgClassFromAllMessages() {
        // Itera sobre cada mensaje en this.messages
        this.messages.forEach(message => {
            // Elimina la clase 'newmsg' del elemento de mensaje
            message.element.classList.remove('newMsg');
        });
    }
    findMessageById(id){
        const message = this.messages.find(message => message.data.id === id);
        console.log(message);
        return message;
    }

}
