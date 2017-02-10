app.controller('appointmentController', function($scope, $routeParams, $location, appointmentFactory, userFactory){
  $scope.errors = [];
  $scope.appointments = [];

  var now = new Date();
  var hours24 = now.getHours();
  var hours = ((now.getHours() + 11) % 12) + 1;
  var amPm = hours24 > 11 ? 'PM' : 'AM';
  var minutes = now.getMinutes();
  now = hours + ':' + minutes + ' ' + amPm;
  $scope.currentTime = now;


  var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	if(dd<10) {
	    dd='0'+dd;
	}

	if(mm<10) {
	    mm='0'+mm;
	}
	today = mm+'/'+dd+'/'+yyyy;
	$scope.currentDate = today;

  $(function() {
  $( '#datepicker' ).datepicker({
    minDate: 0,
  });
  });
  (function($) {
    $(function() {
      $('input.timepicker').timepicker({
        timeFormat: 'h:mm p',
        interval: 30,
        minTime: '8:00am',
        maxTime: '5:00pm',
        startTime: '8:00am',
        dynamic: false,
        dropdown: true,
        scrollbar: true
      });
    });
  })(jQuery);


  userFactory.checkStatus(function(data){
    $scope.curUser = data;
  });

  appointmentFactory.getAll(function(data){
    $scope.appointments = data;
  });

  $scope.cancelAppointment = function(appointment_id){
    appointmentFactory.deleteAppointment(appointment_id);
    appointmentFactory.getAll(function(data){
      $scope.appointments = data;
    });
  };

  $scope.addAppointment = function(){
    $scope.errors = [];
    if(!$scope.newAppointment && $('#datepicker').val() === "" && $('#timepicker').val() === ""){
        $scope.errors.push("Please fill out all fields");
        return;
    } else if($('#datepicker').val() === ""){
        $scope.errors.push("Please enter an appointment date!");
        return;
    } else if ($('#timepicker').val() === ""){
        $scope.errors.push("Please enter an appointment time!");
        return;
    } else if ($('#datepicker').val() === today && $('#timepicker').val() < now){
        $scope.errors.push("Must select a time in the future!");
        return;
    } else if (!$scope.newAppointment){
        $scope.errors.push("Please enter a complaint!");
        return;
    } else if ($scope.newAppointment.complaint.length < 9){
        $scope.errors.push("Complaint must be at least 10 characters in length!");
        return;
    } else {
      $scope.newAppointment.time = $('#timepicker').val();
      $scope.newAppointment.date = $('#datepicker').val();
      appointmentFactory.addAppointment($scope.newAppointment, function(result){
        if(result.status === 'result'){
          $scope.errors.push(result.result);
        }
      });

    }

    $scope.newAppointment = {};
  };
});
