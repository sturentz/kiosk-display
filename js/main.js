 var d = new Date();
        var weekday = new Array(7);
        var branchstatus = "closed";
        var nextchecktime = 0;

        var changedisplay;
        var showdisplay;

        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var today = d.getDay();
        var branchhours = weekday[today];

        var nowhour = (d.getHours()) * 100;
        var nowmin = d.getMinutes();


        var currenttime = nowhour + nowmin;


        var starttime = kioskObj["days"][branchhours][0];
        var endtime = kioskObj["days"][branchhours][1];


        //branch is currently opened?
        if (starttime !== 0) {
            if (currenttime > starttime && currenttime < endtime) {
                branchstatus = "opened";
            }

            //check if before or after opening today
            if (currenttime < starttime) {
                nextchecktime = starttime - currenttime; //before open today;
            } else if (currenttime > endtime) {
                //branch has closed, see when next time will open.
                nextopen();

            }


        } else {
            //see when text time will open	
            nextopen()
        }



       // checkopened = setInterval(nextdisplay, showdisplay);
      console.log(showdisplay);

        if (branchstatus === "closed") {
            //do play closed
            playvideo();

        } else {
            //do play open game  
            playgame();
        }



        function playgame() {
			document.getElementById("content").src="open.html";
            console.log("playgame");

        }

        function playvideo() {
            console.log("playvideo");
			document.getElementById("content").src="close.html";

        }

        function setclosetime() {
            console.log("do close");
            var endtime = kioskObj["days"][branchhours][1];
            var closetime = endtime - currenttime;
            var unittime = ((closetime) / 100);
            showdisplay = getnextdisplay(unittime);

            checkopened = setInterval(nextdisplay, showdisplay);




        }

        function setopentime() {
            console.log("do opening");

        }

        function nextdisplay() {
			
			console.log("next display");

            clearInterval(checkopened);

            switch (branchstatus) {

                case "closed":
                    branchstatus = "opened";
                    setclosetime();
                    playgame();
                    break;

                case "opened":
                    branchstatus = "closed";
                    setopentime();
                    playvideo();
                    break;

                default:
                    break;

            }


        }



        function nextopen() {


            var endofday = 0;
            var nextopened = 0;

            howmanydays = 0;



            for (var i = 1; i < 7; i++) {

                tomorrow = (today + i) % 6;
                tomorrow_branchhours = weekday[tomorrow];
                nextopened = kioskObj["days"][tomorrow_branchhours][0];
                if (nextopened != 0) {


                    endofday = 2400 - currenttime
                    nextopen = kioskObj["days"][tomorrow_branchhours][0];


                    break;
                }




                howmanydays++;

            }

            unittime = ((nextopen + endofday + howmanydays * 2400) / 100);
            showdisplay = getnextdisplay(unittime);
            //console.log(showdisplay);

        }



        function getnextdisplay(unittime) {

            var hours = Math.floor(unittime);
            var minutes = hours * 60 + Math.ceil(60 - (100 - ((unittime % hours) * 100)));
            var seconds = minutes * 60;
            var milliseconds = seconds * 1000;

            return Math.floor(milliseconds);


        }

        //

        //check for holiday, not implemented yet.


        //var checkopened=setInterval(time, 3000);

        console.log(branchstatus);