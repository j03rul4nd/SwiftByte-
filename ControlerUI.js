import { MyUser } from './creationUser.js'   
import { MessageController } from './MessageController.js'

//require("dotenv").config();


export class ControllerUI{
    
    socket = null;
    messageController = null;
    constructor(){
        this.messageController = new MessageController();
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
             chatContent.style.maxHeight = "77vh";
             chatContent.style.maxHeight = "77dvh";
        })

        this.inputUIMessage();
        this.juicyBtn();

        this.loginInitiate();
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
        this.messageController.createMessage(data); // to doom
        this.updateDoom(); // update doom
        
        // Serializa el objeto a una cadena JSON
        const jsonString = JSON.stringify(data);
        this.sendMessage(jsonString); // to backend

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

    loginInitiate(){
        let _me = this;

        _me.simulationChat();

        const userSelectionImg = document.querySelector(".selectionUserImage");
        //default selection
        let userImgSelected = "user_1"
        userSelectionImg.style.backgroundImage = "url(./user_1.png)";

        const userImg_1 = document.getElementById("ImgUser_1");
        userImg_1.addEventListener("click", function(){
            userImgSelected = "user_1"
            userSelectionImg.style.backgroundImage = "url(./user_1.png)";
        });
        const userImg_2 = document.getElementById("ImgUser_2");
        userImg_2.addEventListener("click", function(){
            userImgSelected = "user_2"
            userSelectionImg.style.backgroundImage = "url(./user_2.png)";
        });
        const userImg_3 = document.getElementById("ImgUser_3");
        userImg_3.addEventListener("click", function(){
            userImgSelected = "user_3"
            userSelectionImg.style.backgroundImage = "url(./user_3.png)";
        });
        const userImg_4 = document.getElementById("ImgUser_4");
        userImg_4.addEventListener("click", function(){
            userImgSelected = "user_4"
            userSelectionImg.style.backgroundImage = "url(./user_4.png)";
        });


        let username = document.getElementById("usernameLogin")
        const btn = document.getElementById("btnJoin");
        const btnJoinRoom = document.getElementById("btnJoinRoom");
        username.addEventListener("input", function() {
            // Asegurarse de que el valor sea una cadena y luego aplicar trim()
            const value = (username.value || "").trim();
            
            if (value !== "") {
                btn.removeAttribute("disabled");
                btnJoinRoom.removeAttribute("disabled");
            } else {
                btn.setAttribute("disabled", "disabled");
                btnJoinRoom.setAttribute("disabled", "disabled");
            }
        });

       
        btn.addEventListener("click", function (){
            if (btn.hasAttribute("disabled")) {
                return;
            }
            btnJoinRoom.setAttribute("disabled", "disabled");
            MyUser.imageUser = `./${userImgSelected}.png`
            MyUser.user = username.value;
            console.log(MyUser)
            const statusElement = document.getElementById("contextJoin");
            _me.initiConectionBack(statusElement, false);
            _me.stopSimulation();
        })

        const userRoomCodeElement = document.getElementById("userRoomCode");
        userRoomCodeElement.addEventListener("input", function() {
            // Asegurarse de que el valor sea una cadena y luego aplicar trim()
            const value = (userRoomCodeElement.value || "").trim();

            const usernameValue = (username.value || "").trim();
            
            if (value !== "") {
                btnJoinRoom.removeAttribute("disabled");
                if (usernameValue !== "") {
                    btnJoinRoom.removeAttribute("disabled");
                } else {
                    btnJoinRoom.setAttribute("disabled", "disabled");
                }
            } else {
                btnJoinRoom.setAttribute("disabled", "disabled");
                if (usernameValue !== "") {
                    btnJoinRoom.removeAttribute("disabled");
                } else {
                    btnJoinRoom.setAttribute("disabled", "disabled");
                }
            }
        });

        btnJoinRoom.addEventListener("click", function(){
            if (btnJoinRoom.hasAttribute("disabled")) {
                return;
            }
            btn.setAttribute("disabled", "disabled");
            MyUser.imageUser = `./${userImgSelected}.png`
            MyUser.user = username.value;
            console.log(MyUser)
            const statusElement = document.getElementById("contextJoinRoom");
            const RoomCode = userRoomCodeElement.value;
            _me.initiConectionBack(statusElement, true, RoomCode);
            _me.stopSimulation();
        })




    }
    async initiConectionBack(statusElement, joinroom, RoomCode =""){
       
        // const loadingElement = document.getElementById("loading");
        // const errorElement = document.getElementById("error");
        // const connectionElement = document.getElementById("connection");
        const startTime = performance.now();

        // loadingElement.style.display = "block";
        statusElement.innerHTML = "Loading";
        // errorElement.style.display = "none";
        // connectionElement.style.display = "none";

        try {
            // Crear una nueva instancia de WebSocket
            const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';
            console.log(wsUrl);
            this.socket = new WebSocket(wsUrl);

            // Promesa para esperar a que la conexión se establezca
            await new Promise((resolve, reject) => {
                this.socket.onopen = (event) => {
                    console.log('Conexión WebSocket abierta:', event);
                    // Enviar un mensaje al servidor
                    if(joinroom){
                        // Serializa el objeto a una cadena JSON
                        let dataConnect =  {
                            "type":  "join_room",
                            "roomCode": `${RoomCode}`,
                            "ContainReactiosn":  "hola join_room",
                            
                        }
                        const jsonString = JSON.stringify(dataConnect);
                        this.sendMessage(jsonString); // to backend
                    }else{
                        // Serializa el objeto a una cadena JSON
                        let dataConnect =  {
                            "type":  "create_room",
                            "ContainReactiosn":  "hola create_room",
                            
                        }
                        const jsonString = JSON.stringify(dataConnect);
                        this.sendMessage(jsonString); // to backend
                        //this.socket.send('new room');
                    }
                    
                    this.hideHomePgae();
                    this.NewChat();
                    resolve();
                };

                this.socket.onerror = (error) => {
                    console.error('Error en la conexión WebSocket:', error);
                    reject(error);
                };
            });

            // Configurar los manejadores de eventos restantes después de que la conexión se haya abierto
            this.socket.onmessage = (event) => {
                console.log('Mensaje recibido del servidor:', event);

                try {
                    // Intentar parsear el JSON
                    let data = JSON.parse(event.data);
                    if(data.type == "room_created" ){
                        //{"type":"room_created","roomCode":"8AXB7I59"}
                        console.log("RoomCode: " + data.roomCode);
                        
                        // Obtener la URL actual
                        let currentUrl = new URL(window.location.href);

                        // Agregar el parámetro 'roomCode' a la URL
                        currentUrl.searchParams.set('roomCode', data.roomCode);

                        // Actualizar la URL en la barra de direcciones sin recargar la página
                        window.history.pushState({}, '', currentUrl);
                        return this;
                    }
            
                    // Verificar si data es un objeto y contiene las propiedades esperadas
                    if (typeof data === 'object' && data !== null && data.hasOwnProperty('id')) {
                        console.log(data.id);
                        console.log(data.user);
                        console.log(data.msg);

                        this.messageController.createMessage(data); // to doom
                           
                    } else {
                        console.log('El JSON no tiene la estructura esperada.'+ JSON.stringify(event));
                    }
                } catch (e) {
                    // Si el JSON.parse falla, esto es un string normal
                    console.log('event.data no es un JSON válido:', event.data);
                }
                
            };

            this.socket.onclose = (event) => {
                console.log('Conexión WebSocket cerrada:', event);
                statusElement.innerHTML = "WebSocket connection closed";
            };

            this.sendMessage('Hola mundo');

            const endTime = performance.now();
            const elapsedTime = (endTime - startTime) / 1000; // Convertir a segundos
            console.log("Successfully connected to backend.");
            console.log(`Connection time: ${elapsedTime.toFixed(2)} seconds`);

            // connectionElement.style.display = "block";
            statusElement.innerHTML = "Successfully connected to backend";
        } catch (error) {
            console.error("Error connecting to backend:", error);
            // errorElement.style.display = "block";
            statusElement.innerHTML = "Error connecting to backend";
        } finally {
            // loadingElement.style.display = "none";
            statusElement.innerHTML = "Finished connection attempt";
        }
    }

    hideHomePgae(){
        const HomePageElement = document.querySelector(".homePage");

        HomePageElement.style.display = "none";
    }

    

    // Método para enviar un mensaje a través del WebSocket
    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.log('WebSocket no está abierta o no existe.');
        }
    }

    NewChat(){
        let shareChatRoom =  document.getElementById("shareLinkChat");

        let UrlLinkChatRoom = new URL(window.location.href)
      
        shareChatRoom.addEventListener("click", function (){
            console.log("copy")
            navigator.clipboard.writeText(UrlLinkChatRoom)
            .then(function() {
                console.log("UrlLinkChatRoom: "+UrlLinkChatRoom)
            })
            .catch(function(err) {
                console.error('Error al intentar copiar el texto: ', err);
            });
        });

    }
    timeouts = []; 
    clearTimeouts() {
        // Limpiar todos los temporizadores almacenados
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.timeouts = []; // Reiniciar el array de temporizadores
    }
    stopSimulation() {
        this.clearTimeouts();
    }

   simulationChat() {
        this.clearTimeouts(); // Limpiar cualquier temporizador previo antes de iniciar la simulación

        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10001",
                imageUser: "./user_5.png",
                user: "Alice",
                time: "10:00",
                msg: "Hey everyone!",
                type: "message",
                ContainReactiosn: true,
                reactions: {
                    like: {
                        type: "Like",
                        iconClass: "icon-like",
                        usersReactions: [
                            {
                                user: "Bob",
                                urlImg: "./user_2.png"
                            },
                            {
                                user: "Charlie",
                                urlImg: "./user_3.png"
                            }
                        ]
                    }
                }
            });
        }, 0));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10002",
                imageUser: "./user_2.png",
                user: "Bob",
                time: "10:01",
                msg: "Hey Alice! How are you?",
                type: "message",
                ContainReactiosn: false,
            });
        }, 1000));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10003",
                imageUser: "./user_3.png",
                user: "Charlie",
                time: "10:02",
                msg: "Hi Alice and Bob!",
                type: "message",
                ContainReactiosn: false,
            });
        }, 2000));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10004",
                imageUser: "./user_5.png",
                user: "Alice",
                time: "10:03",
                msg: "I'm good, thanks! How about you guys?",
                type: "message",
                ContainReactiosn: true,
                reactions: {
                    like: {
                        type: "Like",
                        iconClass: "icon-like",
                        usersReactions: [
                            {
                                user: "Bob",
                                urlImg: "./user_2.png"
                            }
                        ]
                    }
                }
            });
        }, 3000));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10005",
                imageUser: "./user_2.png",
                user: "Bob",
                time: "10:04",
                msg: "I'm great! Just working on some projects.",
                type: "message",
                ContainReactiosn: false,
            });
        }, 4000));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10006",
                imageUser: "./user_3.png",
                user: "Charlie",
                time: "10:05",
                msg: "Same here. Busy but good!",
                type: "message",
                ContainReactiosn: false,
            });
        }, 5000));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10007",
                imageUser: "./user_5.png",
                user: "Alice",
                time: "10:06",
                msg: "Nice to hear! Any plans for the weekend?",
                type: "message",
                ContainReactiosn: false,
            });
        }, 6000));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10008",
                imageUser: "./user_2.png",
                user: "Bob",
                time: "10:07",
                msg: "Thinking of going hiking. What about you, Charlie?",
                type: "responseMessage",
                response: {
                    user: "Alice",
                    msg: "Nice to hear! Any plans for the weekend?"
                },
                ContainReactiosn: false,
            });
        }, 7000));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10009",
                imageUser: "./user_3.png",
                user: "Charlie",
                time: "10:08",
                msg: "Might go for a run and then relax at home.",
                type: "message",
                ContainReactiosn: false,
            });
        }, 8000));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10010",
                imageUser: "./user_5.png",
                user: "Alice",
                time: "10:09",
                msg: "Sounds good! Maybe we can catch up on Monday.",
                type: "message",
                ContainReactiosn: false,
            });
        }, 9000));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10011",
                imageUser: "./user_2.png",
                user: "Bob",
                time: "10:10",
                msg: "Sure, let's do that.",
                type: "message",
                ContainReactiosn: false,
            });
        }, 10000));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10012",
                imageUser: "./user_3.png",
                user: "Charlie",
                time: "10:11",
                msg: "Have a great weekend, guys!",
                type: "message",
                ContainReactiosn: false,
            });
        }, 11000));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10013",
                imageUser: "./user_5.png",
                user: "Alice",
                time: "10:12",
                msg: "You too, Charlie!",
                type: "message",
                ContainReactiosn: false,
            });
        }, 12000));
        
        this.timeouts.push(setTimeout(() => {
            this.messageController.createMessage({
                id: "10014",
                imageUser: "./user_2.png",
                user: "Bob",
                time: "10:13",
                msg: "Take care!",
                type: "message",
                ContainReactiosn: false,
            });
        }, 13000));
    }

    
}




// messagecontroller.createmessage({
//     id: "12345",
//     imageuser: "./user_1.png",
//     user: "kevin fragment",
//     time: "9:23",
//     msg: "holaaaaaaaaa",
//     type: "message",
//     containreactiosn: true,
//     reactions: {
//         like: {
//             type: "like",
//             iconclass: "icon-like",
//             usersreactions: [
//                 {
//                     user: "jhon",
//                     urlimg: "./user_2.png"
//                 },
//                 {
//                     user: "remei",
//                     urlimg: "./user_3.png"
//                 },
//                 {
//                     user: "victor",
//                     urlimg: "./user_4.png"
//                 }
                
//             ]
//         },
//         dislike:{
//             type: "Dislike",
//             iconClass: "icon-dislike",
//             usersReactions: [
//                 {
//                     user: "victor",
//                     urlImg: "./user_4.png"
//                 }
//             ]
//         }
//     }
// });

// messageController.createMessage({
//     id: "54321",
//     imageUser: "./user_1.png",
//     user: "Kevin Fragment",
//     time: "9:24",
//     msg: "??",
//     type: "message",
//     ContainReactiosn: false,
// });

// messageController.createMessage({
//     id: "15324",
//     imageUser: "./user_2.png",
//     user: "Victor lercknowled",
//     time: "9:24",
//     msg: "Hola Kevin",
//     type: "message",
//     ContainReactiosn: false,
// });

// messageController.createMessage({
//     id: "14345",
//     imageUser: "./user_2.png",
//     user: "Victor lercknowled",
//     time: "9:24",
//     msg: "que pasa Kevin?",
//     type: "responseMessage",
//     response: {
//         user: "Kevin Fragment",
//         msg: "??"
//     },
//     ContainReactiosn: false,
// });


// messageController.createMessage({
//     id: "14346",
//     imageUser: "./user_3.png",
//     user: "joel beni",
//     time: "9:29",
//     msg: "hola soy joel",
//     type: "message",
//     ContainReactiosn: false,
// });

// messageController.createMessage({
//     id: "14345",
//     imageUser: "./user_3.png",
//     user: "joel beni",
//     time: "9:31",
//     msg: "Kevin?",
//     type: "responseMessage",
//     response: {
//         user: "Kevin Fragment",
//         msg: "??"
//     },
//     ContainReactiosn: false,
// });




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


