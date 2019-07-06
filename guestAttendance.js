// Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBGwi5UY_d7HERBwN314Dsk3OKo2pmcf00",
      authDomain: "guestattendance-1225.firebaseapp.com",
      databaseURL: "https://guestattendance-1225.firebaseio.com",
      projectId: "guestattendance-1225",
      storageBucket: "guestattendance-1225.appspot.com",
      messagingSenderId: "780736687645",
      appId: "1:780736687645:web:c3b3ab61001fc02a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  	var guestCount = 0;
    var myDataRef = firebase.database().ref('messages');

    $('#form').keypress(function (e) {
      if (e.keyCode == 13) {
        
        var name = $('#nameInput').val();
        var organization = $('#orgInput').val();
        var contactNumber = $('#contactInput').val();
        
        if(name && organization && contactNumber){
        myDataRef.push({contactNumber: contactNumber, name: name, organization: organization});
        }
        else{
          alert("Please don't leave any blanks on the form!");
        }
        
        $('#nameInput').val('');
    	  $('#orgInput').val('');
    	  $('#contactInput').val('');
      }
    });

  	var guestName = new Array();
  	var guestOrg = new Array();
  	var guestContactNum = new Array();
    
    myDataRef.on('child_added', function(snapshot) {
      var guest = snapshot.val();
      displayGuestInfo(guest.name, guest.organization, guest.contactNumber);
    });

    function displayGuestInfo(name, organization, contactNumber){
      $('#guests').prepend('<tr><td>'+name+'</td><td>'+organization+'</td><td>'+contactNumber+'</td></tr>');
    }; 