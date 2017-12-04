const socket=io();
socket.on('connect',function(){
    console.log('Connected to server');
 
});
socket.on('disconnect',function(){
    console.log('Disconnected from server');
});
socket.on('newMessage',function(message){
    let formattedTime=moment(message.createdAt).format('h:mm a');
    let template =$('#messageTemplate').html();
    var html=Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formattedTime
    });
    $('#messages').append(html);
});
socket.on('newLocationMessage',function(message){
    let formattedTime=moment(message.createdAt).format('h:mm a');
    let template =$('#locationMessageTemplate').html();
    var html=Mustache.render(template,{
        url:message.url,
        from:message.from,
        createdAt:formattedTime
    });
    $('#messages').append(html);
    // let li=$('<li></li>');
    // let a=$('<a target="_blank">My current location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href',message.url);
    // li.append(a);
    // $('#messages').append(li);    
});
jQuery('#messageForm').on('submit',function(e){
    e.preventDefault();
    let messageTextbox=$('[name=message]');
    socket.emit('createMessage',{
        from:'User',
        text:messageTextbox.val()
    },function(msg){
        messageTextbox.val('');
    });
})
let locationButton=$('#sendLocation');
locationButton.on('click',function(e){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.')
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
    },function(){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.');        
    })
});