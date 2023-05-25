//the javascript code below enables the user to see the current date, add events to time-blocks and save their entries
$(function () {
    // Show the current formatted date using Day.js
    var formattedDate = dayjs().format("dddd, MMMM D");
    $("#currentDay").text(formattedDate);
    
    var savedEvents = JSON.parse(localStorage.getItem('schedulerEvents')) || {};
    var currentHour = dayjs().hour();

    
    for (var hour = 9; hour <= 17; hour++) {
        var hourFormatted = (hour % 12 || 12) + (hour < 12 ? ' AM' : ' PM');
        var timeBlockClass = hour < currentHour ? 'past' : (hour === currentHour ? 'present' : 'future');
        var currentTime = dayjs().hour(hour);
        var data = savedEvents[currentTime.format('YYYY-MM-DD-HH')] || '';
    
        var timeBlock = $(`<div id="hour-${hour}" class="row time-block ${timeBlockClass}">
                                <div class="col-2 col-md-1 hour text-center py-3">${hourFormatted}</div>
                                <textarea class="col-8 col-md-10 description" rows="3">${data}</textarea>
                                <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                                    <i class="fas fa-save" aria-hidden="true"></i>
                                </button>
                           </div>`);
    
        $('.container-lg').append(timeBlock);
    }

    // Save events to local storage on save btn click
    $(".saveBtn").on("click", function() {
        var hour = $(this).parent().attr('id').replace('hour-', '');
        var event = $(this).siblings('.description').val();
        var currentTime = dayjs().hour(hour);
        if(!event) return;

        savedEvents[currentTime.format('YYYY-MM-DD-HH')] = event;
        localStorage.setItem('schedulerEvents', JSON.stringify(savedEvents));
    });
});