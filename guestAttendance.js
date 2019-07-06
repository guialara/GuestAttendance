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
  	var guestName = new Array();
  	var guestOrg = new Array();
  	var guestContactNum = new Array();
    var nameNOrgPtrn = new RegExp('^[a-zA-Z0-9]+$');
    var numPtrn = new RegExp('^(\\+?[0-9]{2,3})?[0-9]{10}$');
    
    myDataRef.on('child_added', function(snapshot) {
      var guest = snapshot.val();
      displayGuestInfo(guest.name, guest.organization, guest.contactNumber);
    });

    $('#form').keypress(function (e) {
      if (e.keyCode == 13) {
        
        var name = $('#nameInput').val();
        var organization = $('#orgInput').val();
        var contactNumber = $('#contactInput').val();
        
        if(validation()){
          myDataRef.push({contactNumber: contactNumber, name: name, organization: organization});
          $('#nameInput').val('');
          $('#orgInput').val('');
          $('#contactInput').val('');
        }
      }
    });

    $('#nameInput').keyup(function (e){
      if(nameNOrgPtrn.test($('#nameInput').val())){
        $('#nameInput').css("border-color","");
      }
      else{
        $('#nameInput').css("border-color","red");
      }
    });

    $('#orgInput').keyup(function (e){
      if(nameNOrgPtrn.test($('#orgInput').val())){
        $('#orgInput').css("border-color","");
      }
      else{
        $('#orgInput').css("border-color","red");
      }
    });

    $('#contactInput').keyup(function (e){
      if(numPtrn.test($('#contactInput').val())){
        $('#contactInput').css("border-color","");
      }
      else{
        $('#contactInput').css("border-color","red");
      }
    });

    function displayGuestInfo(name, organization, contactNumber){
      $('#guests').prepend('<tr><td>'+name+'</td><td>'+organization+'</td><td>'+contactNumber+'</td></tr>');
    }; 

    function submitFormAttendance(){
        $('#form').submit();
        var name = $('#nameInput').val();
        var organization = $('#orgInput').val();
        var contactNumber = $('#contactInput').val();
        
        if(validation()){
          myDataRef.push({contactNumber: contactNumber, name: name, organization: organization});
          $('#nameInput').val('');
          $('#orgInput').val('');
          $('#contactInput').val('');
        }   
    }

    function validation(){
        var isValid = true;
        var name = $('#nameInput').val();
        var organization = $('#orgInput').val();
        var contactNumber = $('#contactInput').val();

        if(!name || !nameNOrgPtrn.test(name)){
          $('#nameInput').css("border-color","red");
          isValid = false;
        }

        if(!organization || !nameNOrgPtrn.test(name)){
          $('#orgInput').css("border-color","red");
          isValid = false;
        }

        if (!contactNumber || !numPtrn.test(contactNumber)) {
          $('#contactInput').css("border-color","red");
          isValid = false;
        }

        return isValid
    }