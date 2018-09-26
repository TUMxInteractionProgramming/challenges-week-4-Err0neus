/* #6 start the #external #action and say hello */
console.log("App is alive");

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */

/* #7 initiating a variable for current channel... */

var currentChannel = SevenContinents

/* #7 ...and current location */
var currentLocation = {
    longitude: 44.849080,
    latitude: 24.886740,
    what3words:"payback.reddish.scooter"
}


function switchChannel(channelName) {
    //Log the channel switch
    console.log("Tuning in to channel", channelName);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = '#'+channelName.name;

    //#6 change the #channel #location
    //#7 using the object properties
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/' + channelName.createdBy + '" target="_blank"><strong>' + channelName.createdBy + '</strong></a>';


    /* #7 change the star according to the channel selected, using Font Awesome and a condition using object property info */
    imageName = (channelName.starred == true) ? "fas fa-star" : "far fa-star";
    $('#channel-star').attr('class', imageName);


    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelName.name + ')').addClass('selected');


    /* #7 storing current channel in VAR */
    currentChannel = channelName
}

/* #6 #liking a channel on #click */
/* #7 override using Font Awesome */
function star() {
    $('#channel-star').toggleClass('far fa-star fas fa-star');
    /* #7 change the STARRED attribute value */
    currentChannel.starred = !currentChannel.starred;
    /* #7 update star in the channel list area */
    toggleStar(currentChannel)

}


/* #7 a function to toggle star in the channel area depending on the current status of the STARRED attribute */
function toggleStar(channel) {
    iconCurrent = (channel.starred == false) ? "fas fa-star" : "far fa-star";
    iconNew = (channel.starred == true) ? "fas fa-star" : "far fa-star";
    $('#channels li:contains(' + channel.name + ') i:first').attr('class', iconNew);
}
/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}


/* #8 message constructor */
function Message(text) {
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = Date.now();
    this.expiresOn = this.createdOn + (1000*60*15);
    this.text = text;
    this.own = true;
}

/* #8 calling global var for storing the message content */
newMessageContent = ''

/* #8 send message function */
function sendMessage() {
    /* #8 read user input */
    var userInput = $('#message-input').val();
    /* #8 build the new message using the constructor */
    newMessage = new Message(userInput);
    /* #8 log the new message */
    console.log(newMessage);
    /* #8 create the message element */
    createMessageElement(newMessage);
    /* #8 append the created message to messages */
    $("<div>").html(newMessageContent).appendTo("#messages");
    /* #8 clear the input after the message has been sent */
    document.getElementById('message-input').value = '';
    /* #8 scroll the content up if no space for the new message */
    updateScroll();

}

/* #8 creating message element function */
function createMessageElement(messageObject) {
    /* #8 check if own class, build a var to add class if true */
    ownOrNot = (newMessage.own == true) ? 'message own' : 'message';
    /* #8 date formatting */
    date = new Date(newMessage.createdOn);
    var options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    /* #8 building the message html */
    newMessageContent = '<div class="'
    /* #8 class 'message own' or 'message' */
    + ownOrNot
    + '"><h3><a href=http://w3w.co/' 
    + messageObject.createdBy 
    + ' target="_blank"><strong>' 
    + messageObject.createdBy
    + '</strong></a> '
    /* #8 formatted time of submission */
    + date.toLocaleString('en-GB',options)
    + '<em>'
    /* #8 time left in minutes */
    + Math.round((((messageObject.expiresOn - Date.now()) % 86400000) % 3600000) / 60000)
    + ' min. left</em></h3> <p>'
    /* #8 message text */
    + messageObject.text
    + '</p> <button>+5 min.</button> </div>'


}


/* #8 function to always display new message on the screen by scrolling content up */

function updateScroll(){
    var messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;
}

/* #8 function that lists channels on load */
function listChannels() {
    createChannelElement(Yummy);
    createChannelElement(SevenContinents);
    createChannelElement(KillerApp);
    createChannelElement(FirstPersonOnMars);
    createChannelElement(Octoberfest);
}

/* #8 function that constructs the channel list and appends to UL html element */
function createChannelElement(channelObject) {
    console.log(channelObject);
    
    /* #8 define correct star icon for the channel */
    var iconClass = (channelObject.starred == true) ? "fas fa-star" : "far fa-star";

    /* #8 styling for the additional boxes */
    var boxesStyle = {
        'background-color': '#3F51B5',
        'font-size': 'small',
        'color': 'white',
        'padding': '2px 4px',
        'margin': '2px',
        'border-radius': '2px',
    };

    var parentBoxesStyle = {
        'display': 'flex',
        'align-items': 'center'
    };


    return $('<li>')
    .attr('onclick', 'switchChannel(' + channelObject.name + ')')
    .html('#' + channelObject.name)
    .append($
        ('<span>')
        .attr('class', 'channel-meta')
        .css(parentBoxesStyle)
        .append($
            ('<i>')
            .attr('class', iconClass))
        .append($
            ('<span>' + channelObject.expiresIn + ' min</span>')
            .css(boxesStyle))
        .append($
            ('<span>' + channelObject.messageCount + ' new</span>')
            .css(boxesStyle))
        .append($
            ('<i>')
            .attr('class', 'fas fa-chevron-right')))
    .appendTo('#channel-list');
}


