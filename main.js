import './main.css'
import 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js'


export class Message {

    OptionsMessage ={
        copy: {
            name: 'copy',
            iconClass: 'icon-copy',
            onclick: (data) => this.copyHandler(data) 
        },
        reply: {
            name: "reply",
            iconClass: "icon-reply",
            onclick: (data) => this.replyHandler(data)
        },
        reaction: {
            Like: {
                name: "Like",
                iconClass: "icon-like",
                onclick:  (data) => this.reactionHandler(data, "Like")
            },
            Dislike: {
                name: "Dislike",
                iconClass: "icon-dislike",
                onclick:  (data) =>  this.reactionHandler(data, "Dislike")
            }
        },
    }
    constructor(){

    }
    createMessage(data){
        const { user, time, msg, type, response, ContainReactiosn, reactions, imageUser } = data;

        let myMessage = false;
        if(user == MyUser.user){
            myMessage = true;
        }
        const messageDiv = this.createMessageDiv(user, time, msg, type, response, ContainReactiosn, reactions, imageUser, myMessage);
        const chatGlobalDiv = document.getElementById('chatContent');
        chatGlobalDiv.appendChild(messageDiv);
        chatGlobalDiv.scrollTop = chatGlobalDiv.scrollHeight;
        return messageDiv;
    };
    createMessageDiv(user, time, msg, type, response, ContainReactiosn, reactions, imageUser, myMessage) {
        const sectionChatMessageUserCNTR = this.createDivWithClass('sectionChatMessageUserCNTR');
        let cntrMessageUser = null;
        if(myMessage){
            cntrMessageUser = this.createDivWithClass('cntrMessageUser cntrMyMessageUser');
        }else{
            cntrMessageUser = this.createDivWithClass('cntrMessageUser');
        }
        const iconUserMessage = this.createDivWithClass(`iconUserMessage`);
        iconUserMessage.style.backgroundImage = `url(${imageUser})`;

        let messageUserCNTRcontent = null;
        if(myMessage){
            messageUserCNTRcontent = this.createDivWithClass('messageUserCNTRcontent messageMyUserCNTRcontent');
        }else{
            messageUserCNTRcontent = this.createDivWithClass('messageUserCNTRcontent');
        }
        const InfoUsermessage = this.createDivWithClass('InfoUsermessage');
        const userdataAuth = this.createDivWithClass('userdataAuth', user);
        const dataTimeUser = this.createDivWithClass('dataTimeUser', time);
        
        let message = null;
        if(myMessage){
            message = this.createDivWithClass('message MyMessage');
        }else{
            message = this.createDivWithClass('message');
        }

        // Create options for message
        const data = { user: user, msg: msg, time: time}
        const popUpMessageCNTR = this.createOptionsDiv(this.OptionsMessage, data);
        let UserContentMessage = null;
        if(myMessage){
            UserContentMessage = this.createDivWithClass('no-select UserContentMessage UserContentMyMessage', msg);

        }else{
            UserContentMessage = this.createDivWithClass('no-select UserContentMessage', msg);
        }

        if (type === 'message'){
            //reaction section
            const dataMessageContainer = [InfoUsermessage, message]
            if(ContainReactiosn == true ){
                const reactionMessage = this.createReactionsSections(reactions)
                dataMessageContainer.push(reactionMessage);
            }

            this.appendChildren(InfoUsermessage, [userdataAuth, dataTimeUser]);
            this.appendChildren(message, [popUpMessageCNTR, UserContentMessage]);
            this.appendChildren(messageUserCNTRcontent, dataMessageContainer);
            this.appendChildren(cntrMessageUser, [iconUserMessage, messageUserCNTRcontent]);
            this.appendChildren(sectionChatMessageUserCNTR, [cntrMessageUser]);
        }else if(type === 'responseMessage'){

            const userReplyInfo = this.createDivWithClass('UserReplyInfoChat',`${response.user}: `);
            const msgReplyInfo = this.createDivWithClass('msgReplyInfoChat', response.msg);
            let replyMessageUser = null;
            if(myMessage){
                replyMessageUser = this.createDivWithClass('replyMsgUserChat replyMyMsgUserChat');
            }else{
                replyMessageUser = this.createDivWithClass('replyMsgUserChat');
            }

            this.appendChildren(replyMessageUser, [userReplyInfo, msgReplyInfo]);

            //reaction section
            const dataMessageContainer = [InfoUsermessage, replyMessageUser, message]
            if(ContainReactiosn == true ){
                const reactionMessage = this.createReactionsSections(reactions)
                dataMessageContainer.push(reactionMessage);
            }

            this.appendChildren(InfoUsermessage, [userdataAuth, dataTimeUser]);
            this.appendChildren(message, [popUpMessageCNTR, UserContentMessage]);
            this.appendChildren(messageUserCNTRcontent, dataMessageContainer);
            this.appendChildren(cntrMessageUser, [iconUserMessage, messageUserCNTRcontent]);
            this.appendChildren(sectionChatMessageUserCNTR, [cntrMessageUser]);
        }

        return sectionChatMessageUserCNTR;
    };
    createReactionsSections(reactions){
        let _me = this;
        function iterateReactionsMessage(reactions_1) {
            for (const key in reactions_1) {
              if (typeof reactions_1[key] === 'object' && reactions_1[key] !== null) {
                iterateReactionsMessage(reactions_1[key]);
              } else {
                if (key === 'iconClass') {
                  
                    const sectionReactionElement = _me.createDivWithClass("sectionReactionElement");
                    sectionReactionElement.setAttribute("reactionType", reactions_1.type);

                    const TypeReactionMessage = _me.createDivWithClass(`TypeReactionMessage ${reactions_1.iconClass}`);
                    
                    const UsersReactionMessage = _me.createDivWithClass('UsersReactionMessage', );                           
                    
                    reactions_1.usersReactions.forEach(reaction => {
                        const UserReactionMessage = _me.createDivWithClass('UserReactionMessage');
                        
                        UserReactionMessage.setAttribute("userName", reaction.user);
                    
                        UserReactionMessage.style.backgroundImage = 'url(' + reaction.urlImg + ')';
                    
                        UsersReactionMessage.appendChild(UserReactionMessage);
                    });
                    

                    _me.appendChildren(sectionReactionElement, [TypeReactionMessage, UsersReactionMessage]);

                    _me.appendChildren(reactionMessage, [sectionReactionElement]);
                }
              }
            }
        }
          
        const reactionMessage = this.createDivWithClass('reactionMessageSection');
          
        iterateReactionsMessage(reactions);  

       // this.appendChildren(reactionMessage, [TypeReactionMessage, UsersReactionMessage]);
        return reactionMessage
    };
    copyHandler(data){
        const { msg } = data
        navigator.clipboard.writeText(msg)
            .then(function() {
            })
            .catch(function(err) {
                console.error('Error al intentar copiar el texto: ', err);
            });

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };
    replyHandler(data){
        const { user, msg } = data;
        console.log("reply " + user + ":"+ msg);  

        var replyMessage = document.querySelector('.replyMessage');
        replyMessage.setAttribute('active', 'true')
        replyMessage.style.opacity = '1';
        replyMessage.style.maxHeight =  "50px";
        var chatContent = document.getElementById('chatContent');
        chatContent.style.maxHeight = "80vh";

        var userReply = document.querySelector('.userReplyMessageDataUser');
        userReply.setAttribute('user', `${user}`)
        if(user == MyUser.user){
            userReply.textContent = "You message: ";
        }else{
            userReply.textContent = user+": ";
        }

        var message = document.querySelector('.msgReplyUser');
        message.textContent = msg;

        let input = document.getElementById('InputMessageUser');
        input.focus();

    };
    reactionHandler(data, type){
        const { event } = data;

        let _me = this;

        console.log("reaction "+ type);

        var messageContainer = event.currentTarget.closest(".messageUserCNTRcontent");
        var reactionSection = messageContainer.querySelector(".reactionMessageSection");

        if(reactionSection){
            let sectionReactionElement = reactionSection.querySelector(`.sectionReactionElement[reactionType="${type}"]`);
            if(sectionReactionElement != null){

                const UsersReactionMessage = sectionReactionElement.querySelector(".UsersReactionMessage");

                var children = UsersReactionMessage.children;
                var existReactionUser = false;
    
                for (var i = 0; i < children.length; i++) {
                    if (children[i].classList.contains('UserReactionMessage')) {
                        if (children[i].getAttribute('userName') === MyUser.user) {
                            existReactionUser = true;
                            children[i].remove();
                            //si children.lenght es 0 luego de elimnarlo 
                            //pues eliminar tambien el contenedor de reaccion
                            if(children.length == 0){
                                sectionReactionElement.remove();
                                //UsersReactionMessage
                                if(reactionSection.children.length == 0){
                                    reactionSection.remove();
                                }
                            }                            
                            //console.log("Se encontró un mensaje de reacción del usuario:", MyUser.user);
                            break; 
                        }
                    }
                }                

                if(!existReactionUser){
                    _me.createUserReactionType(UsersReactionMessage)
                }

            }else{
                const newReaction = _me.createNewReaction(type);
                reactionSection.appendChild(newReaction);
            }            
        }else{
           let reactionSectionElement =  _me.createContainerReactions(type)
           messageContainer.appendChild(reactionSectionElement);
        }
    };
    createContainerReactions(type){
        // create container reactions section
        let _me = this;
        
        let reactionSectionElement = document.createElement("div");
        reactionSectionElement.className = "reactionMessageSection";
        
        let sectionReactionElement = _me.createNewReaction(type);

        reactionSectionElement.appendChild(sectionReactionElement);

        return reactionSectionElement   
    }
    createNewReaction(type){
        //creationnew reaction
        // icon reaction 
        // section user reaction
        let _me = this;

        let sectionReactionElement = document.createElement("div");
        sectionReactionElement.className = "sectionReactionElement";
        sectionReactionElement.setAttribute("reactionType", type);


        let iconClass = _me.OptionsMessage.reaction[type].iconClass

        const TypeReactionMessage = _me.createDivWithClass(`TypeReactionMessage ${iconClass}`);
                 
        const UsersReactionMessage = _me.createDivWithClass('UsersReactionMessage' );

        _me.createUserReactionType(UsersReactionMessage);
    
        _me.appendChildren(sectionReactionElement, [TypeReactionMessage, UsersReactionMessage]);

        return sectionReactionElement

    }
    createUserReactionType(UsersReactionMessage){
        let _me = this;
        // img and atribute username
        const UserReactionMessage = _me.createDivWithClass('UserReactionMessage');
        const urlImageProfile = MyUser.imageUser;
        UserReactionMessage.setAttribute("userName", MyUser.user);
        UserReactionMessage.style.backgroundImage = 'url(' + urlImageProfile + ')';

        UsersReactionMessage.appendChild(UserReactionMessage);
    }
    createOptionsDiv(options, data) {
        let _me = this;
        function iterateOptionsMessage(options_1) {
            for (const key in options_1) {
              if (typeof options_1[key] === 'object' && options_1[key] !== null) {
                iterateOptionsMessage(options_1[key]);
              } else {
                if (key === 'name') {
                  
                  const iconMessagePopUp = _me.createDivWithClass(`iconMessagePopUp ${options_1.iconClass}`);
                //   const iconMessagePopUp = _me.createDivWithClass(`iconMessagePopUp ${options_1.iconClass}`, options_1.name);
                  iconMessagePopUp.addEventListener('click', function(event){
                    data.event = event;
                    options_1.onclick(data);
                  });
                 
                  popUpMessageCNTR.appendChild(iconMessagePopUp);
                }
              }
            }
        }
          
        const popUpMessageCNTR = this.createDivWithClass('popUpMessageCNTR');
          
        iterateOptionsMessage(options);           
             
        
        return popUpMessageCNTR;
    };
    createDivWithClass(className, textContent = '') {
        const div = document.createElement('div');
        div.className = className;
        div.textContent = textContent;
        return div;
    };
    appendChildren(parent, children) {
        children.forEach(child => parent.appendChild(child));
    }; 
}

class MessageController {
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


// MyUser
const MyUser = {
    imageUser: "./user_3.png",
    user: "joel beni",
}


// Ejemplo de uso
const messageController = new MessageController();

messageController.createMessage({
    id: "12345",
    imageUser: "./user_1.png",
    user: "Kevin Fragment",
    time: "9:23",
    msg: "Holaaaaaaaaa",
    type: "message",
    ContainReactiosn: true,
    reactions: {
        like: {
            type: "Like",
            iconClass: "icon-like",
            usersReactions: [
                {
                    user: "jhon",
                    urlImg: "./user_2.png"
                },
                {
                    user: "remei",
                    urlImg: "./user_3.png"
                },
                {
                    user: "victor",
                    urlImg: "./user_4.png"
                }
                
            ]
        },
        dislike:{
            type: "Dislike",
            iconClass: "icon-dislike",
            usersReactions: [
                {
                    user: "victor",
                    urlImg: "./user_4.png"
                }
            ]
        }
    }
});

messageController.createMessage({
    id: "54321",
    imageUser: "./user_1.png",
    user: "Kevin Fragment",
    time: "9:24",
    msg: "??",
    type: "message",
    ContainReactiosn: false,
});

messageController.createMessage({
    id: "15324",
    imageUser: "./user_2.png",
    user: "Victor lercknowled",
    time: "9:24",
    msg: "Hola Kevin",
    type: "message",
    ContainReactiosn: false,
});

messageController.createMessage({
    id: "14345",
    imageUser: "./user_2.png",
    user: "Victor lercknowled",
    time: "9:24",
    msg: "que pasa Kevin?",
    type: "responseMessage",
    response: {
        user: "Kevin Fragment",
        msg: "??"
    },
    ContainReactiosn: false,
});


messageController.createMessage({
    id: "14346",
    imageUser: "./user_3.png",
    user: "joel beni",
    time: "9:29",
    msg: "hola soy joel",
    type: "message",
    ContainReactiosn: false,
});
messageController.createMessage({
    id: "14345",
    imageUser: "./user_3.png",
    user: "joel beni",
    time: "9:31",
    msg: "Kevin?",
    type: "responseMessage",
    response: {
        user: "Kevin Fragment",
        msg: "??"
    },
    ContainReactiosn: false,
});

let data = {
    id: "14345",
    ContainReactiosn: true,
    reactions: {
        like: {
            type: "Like",
            iconClass: "icon-like",
            usersReactions: [
                {
                    user: "jhon",
                    urlImg: "./user_2.png"
                },
                {
                    user: "remei",
                    urlImg: "./user_3.png"
                },
                {
                    user: "victor",
                    urlImg: "./user_4.png"
                }
                
            ]
        },
        dislike:{
            type: "Dislike",
            iconClass: "icon-dislike",
            usersReactions: [
                {
                    user: "victor",
                    urlImg: "./user_4.png"
                }
            ]
        }
    }
}
//messageController.updateReaction(data)




class ControllerUI{
    constructor(){
        this.init();
    }
    init(){
        // listeners add ui 
        var closBtnReply = document.querySelector('.closeReplyMsgUser');
        var replySection = document.querySelector('.replyMessage');
        closBtnReply.addEventListener('click', () =>{
            replySection.style.maxHeight =  "0PX";
            replySection.style.opacity = "0";
            replySection.setAttribute('active', 'false')
            var chatContent = document.getElementById('chatContent');
            chatContent.style.maxHeight = "83vh";
        })

        this.inputUIMessage();
        this.juicyBtn();
    }
    inputUIMessage(){
        let _me = this;

        let input = document.getElementById('InputMessageUser');
        let btn   = document.getElementById('sendBtnMessage');
        let reply = document.querySelector('.replyMessage');

        input.addEventListener('keyup', () => {
            if (event.key === 'Enter') { // Verificar si la tecla presionada es "Enter"
                if (input.value.trim() !== '') { // Verificar si hay contenido en el input
                    btn.click(); // Simular un clic en el botón
                }
            } else {
                if (input.value.trim() !== '') {
                    btn.setAttribute('active', 'true'); 
        
                    setTimeout(() => {
                        btn.classList.add('bounce');
                    }, 100); // 100 milisegundos de retraso
                } else {
                    btn.removeAttribute('active'); // Eliminar el atributo 'active' si el input está vacío
                    btn.classList.remove('bounce'); // Eliminar la clase 'bounce'
                }
            }
        });

        btn.addEventListener('click', () =>{
            let inputValue = input.value;
            
            // Verificar si inputValue no es undefined y si es un string
            if (typeof inputValue === 'string') {
                let msg = inputValue.trim(); // Eliminar espacios en blanco al principio y al final
                
                // Verificar si el mensaje no está vacío
                if (msg !== "") {
                    console.log(msg);
                    input.value = ''; // Limpiar el campo de entrada

                   
        
                    let currentTime = new Date();
                    let minutes = currentTime.getMinutes();
                    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                    let data = {
                        id: crypto.randomUUID(),
                        imageUser: MyUser.imageUser,
                        user: MyUser.user,
                        time: `${currentTime.getHours()}:${formattedMinutes}`,
                        msg: msg,
                        type: "message",
                        ContainReactiosn: false,
                    }

                    if (reply.getAttribute("active") === "true") {
                        data.type = "responseMessage";
                        let userReply = document.querySelector(".userReplyMessageDataUser");
                        let  user = userReply.getAttribute("user")
                        let userReplyMessage = document.querySelector(".msgReplyUser");
                        data.response = {
                            user: user,
                            msg: userReplyMessage.innerHTML
                        };
                        var closBtnReply = document.querySelector('.closeReplyMsgUser');
                        closBtnReply.click();
                    }
        
                    _me.sendNewMessage(data);
                    btn.removeAttribute('active');
                } else {
                    // Si el mensaje es vacío, mostrar un mensaje de error o realizar alguna otra acción
                    console.log("El mensaje está vacío.");
                    input.classList.add('shake');

                    // Quita la clase después de 1 segundo
                    setTimeout(function() {
                        input.classList.remove('shake');
                    }, 1000);
                }
            } else {
                // Si inputValue es undefined o no es un string, mostrar un mensaje de error o realizar alguna otra acción
                console.log("El valor del input no es válido.");
            }
        });
        

    }
    sendNewMessage(data){
        messageController.createMessage(data);
        this.updateDoom();
    }
    juicyBtn() {
        let selectors = [
            ".UserContentMessage",
            ".iconUserMessage",
            ".iconMessagePopUp",
            ".reactionMessageSection",
            "#sendBtnMessage",
            ".iconCancelReply"
        ];
    
        selectors.forEach(function (selector) {
            var elementsToModify = document.querySelectorAll(selector);
    
            elementsToModify.forEach(function (element) {
                element.addEventListener("touchstart", function () {
                    this.classList.add("contractedItem");
                });
    
                element.addEventListener("mousedown", function () {
                    this.classList.add("contractedItem");
                });
    
                element.addEventListener("touchend", function () {
                    this.classList.remove("contractedItem");
                });
    
                element.addEventListener("mouseup", function () {
                    this.classList.remove("contractedItem");
                });
    
                element.addEventListener("mouseout", function () {
                    this.classList.remove("contractedItem");
                });
            });
        });
    }

    updateDoom(){
        this.juicyBtn();
    }
    
}
const controllerUI = new ControllerUI();