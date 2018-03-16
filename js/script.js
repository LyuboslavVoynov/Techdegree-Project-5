

!function () {
  //sending the ajax request and displaying 12 employees on the page with the data provided from the api
  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=gb,us' ,
    dataType: 'json',
    success: function(data) {
      for (let i = 0; i < data.results.length; i++) {
        let employeeData = data.results[i];
        $('#'+(i)+' img').attr('src', employeeData.picture.large);
        //displaying the name with 1st letter capitalized
        $('#'+(i)+' .name').html( employeeData.name.first.substring(0,1).toUpperCase() + employeeData.name.first.substring(1)  +
         ' ' + employeeData.name.last.substring(0,1).toUpperCase() + employeeData.name.last.substring(1) );
        $('#'+(i)+' .email').html(employeeData.email);
        //displaying the city with 1st letter capitalized
        $('#'+(i)+' .city').html(employeeData.location.city.substring(0,1).toUpperCase() + employeeData.location.city.substring(1));

      }
      $('li').click(function(event) {
        //creating a blur background effect
        $('.wrapper').css('filter','blur(4px)')
                     .css(' webkit-filter','blur(4px)');


        const $overlay = $(`
          <div class="overlay">
            <div class="lightbox">
              <button id="previous"><</button>
              <button id="next">></button>
              <div class="main-info">
                <img class="thumbnail2">
                <h4 class="name2"></h4>
                <p class="email2"></p>
                <p class="city2"></p>
              </div>
              <div class="details">
                <p class="username2"></p>
                <p class="cell"></p>
                <p class="address"></p>
                <p class="birthday"></p>
              </div>
            </div>
          </div>
          `);
        $('.container').append($overlay);
        //  details in overlay window
        let employeeOverlay = data.results[this.id];
        $('.thumbnail2').attr('src',  employeeOverlay.picture.large);
        $('.name2').html( employeeOverlay.name.first.substring(0,1).toUpperCase() + employeeOverlay.name.first.substring(1)  +
         ' ' + employeeOverlay.name.last.substring(0,1).toUpperCase() + employeeOverlay.name.last.substring(1) );
        $('.email2').html(employeeOverlay.email);
        $('.city2').html(employeeOverlay.location.city.substring(0,1).toUpperCase() + employeeOverlay.location.city.substring(1));
        $('.cell').html(employeeOverlay.cell);
        $('.address').html(employeeOverlay.location.street + employeeOverlay.location.city +
        ', ' + employeeOverlay.location.state + ', ' +  employeeOverlay.location.postcode);
        $('.birthday').html('Birthday: ' + employeeOverlay.dob.slice(0, 11));
        $('.username2').html('Username: ' + employeeOverlay.login.username);

        let employeeId = this.id;
        //BUTTONS
        // hide and show buttons when needed
        if (parseInt(employeeId) == 0) {
          $('#previous').hide()
        }
        else if (parseInt(employeeId) == 11) {
          $('#next').hide();
        }
        $('#next').click(function () {
          $overlay.remove();
          $('li')[parseInt(employeeId)+1].click();
        })
        $('#previous').click(function () {
          $overlay.remove();
          $('li')[parseInt(employeeId)-1].click();
        })
        //removing the overlay and the blur effect when any other area on the screen , except the overlay  is clicked
        $overlay.click((event) => {
          if (event.target.className == 'overlay') {
            $overlay.remove();
            $('.wrapper').css('filter','none')
                         .css(' webkit-filter','none');
          }
        })
      });//end click
    }//end success
  });//end ajax
}();
