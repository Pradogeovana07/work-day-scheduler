$(document).ready(function () {

    const currentDateEl = $("header #currentDay");

    let calEvents = {};

    let hourRendered = moment();

   
    function renderCalendar(today, calEvents) {

        let rowHr = moment(today).hour(9); 
        const calendar = $("div.container"); 
        calendar.empty(); 

        
        for (let i = 1; i < 10; i++) {

            const row = $("<div>").addClass("row"); 

            let classOfHour = "";
            if (today.isBefore(rowHr, "hour")) {
                classOfHour = "future"
            } else if (today.isAfter(rowHr, "hour")) {
                classOfHour = "past"
            } else {
                classOfHour = "present"
            };

            calendar.append(row);
            
            row.append($("<div>").addClass("col-2 hour").text(rowHr.format("h A")));
            
            let timeBlock = rowHr.format("hA"); 
            row.append($("<textarea>").addClass(`col-8 ${classOfHour}`).text(calEvents[timeBlock]));
           
            row.append($("<button>").addClass("col-2 saveBtn").html("<i class='fas fa-save'></i>").attr("aria-label", "Save").attr("id", rowHr.format("hA")));

            rowHr.add(1, "hour");

            hourRendered = moment();
        };
    };

        function initCalendar() {
        const today = moment(); 
        currentDateEl.text(today.format('LL'));
        renderCalendar(today, calEvents);
    };

        function loadCal() {
        const storedCal = JSON.parse(localStorage.getItem("calEvents"));
        if (storedCal) {
            calEvents = storedCal;
        };
    };

    loadCal(); 
    initCalendar(); 
    hourTracker(); 

    function hourTracker() {
        const checkHourInterval = setInterval(function () {
            if (moment().isAfter(hourRendered, "minute")) {
                initCalendar();
            }
        }, 60000);
    };

    function storeCal() {
        localStorage.setItem("calEvents", JSON.stringify(calEvents));
    };

    function clearCalendar() {
        calEvents = {};
        storeCal();
        initCalendar();
    };

    $("button#clear-cal").on("click", clearCalendar);

    $(document).on("click", "button.saveBtn", function (event) {
        let calDesc = event.currentTarget.parentElement.children[1].value; 
        calEvents[event.currentTarget.id] = calDesc; 
        storeCal();
    });

});