// MyUser
import { MyUser } from './creationUser.js'   

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
        chatContent.style.maxHeight = "70vh";
        chatContent.style.maxHeight = "70dvh";


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