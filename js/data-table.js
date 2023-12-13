;(function ($) {
  'use strict'
  $(function () {
    console.log(serverUrl)
    $('#order-listing').DataTable({
      aLengthMenu: [
        [5, 10, 15, -1],
        [5, 10, 15, 'All']
      ],
      iDisplayLength: 10,
      language: {
        search: ''
      }
    })
    $('#order-listing').each(function () {
      var datatable = $(this)
      // SEARCH - Add the placeholder for Search and Turn this into in-line form control
      var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input')
      search_input.attr('placeholder', 'Search')
      search_input.removeClass('form-control-sm')
      // LENGTH - Inline-Form control
      var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select')
      length_sel.removeClass('form-control-sm')
    })
    // When the button is clicked, show the modal
    $('#openModalBtn').click(function () {
      $('#myModal').css('display', 'flex')
    })
    // When the close button inside the modal is clicked, hide the modal
    $('#closeModalBtn').click(function () {
      $('#myModal').css('display', 'none')
    })
    // When clicking outside the modal, close it
    $(window).click(function (event) {
      if (event.target.id === 'myModal') {
        $('#myModal').css('display', 'none')
      }
    })

    // Fetch data from the server with the actual endpoint)
    $.ajax({
      url: serverUrl + '/admin/members',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res) {
          const loading = document.getElementById('loading-member-table')
          loading.innerText = ''
        }
        const newData = res.data
        console.log(res.data)
        var tableBody = $('#member-table-body')
        tableBody.empty()
        // Clear existing data in the table

        // Iterate over each member data and append a new row
        $.each(newData, function (index, member) {
          let row = $('<tr>')
          row.append(
            '<td><a href="' +
              serverUrl +
              '/admin/member/' +
              member.user_id +
              '" target="_blank">' +
              member.user_id +
              '</a></td>'
          )
          row.append('<td>' + member.profile?.username + '</td>')
          row.append('<td>' + member.profile?.invited_code + '</td>')
          row.append('<td>' + member.profile?.lastname + ' ' + member.profile?.firstname + '</td>')
          row.append('<td>' + member.profile?.phone + '</td>')
          row.append('<td>' + member.email + '</td>')
          row.append('<td>' + member.profile?.total_wagered + '</td>')
          row.append('<td>' + member.ggr + '</td>')
          row.append('<td>' + member.profile?.total_chat_messages + '</td>')
          row.append('<td>' + member.totalBalance + '</td>')
          row.append('<td>' + member.bankInfo + '</td>')
          row.append(
            '<td>' +
              new Date(member.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) +
              '</td>'
          )
          row.append('<td>' + member.userFirstAndLastDeposit.first_deposit + '</td>')
          row.append('<td>' + member.userFirstAndLastDeposit.last_deposit + '</td>')
          row.append(
            '<td>' +
              new Date(member.lastLoginAt).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) +
              '</td>'
          )
          row.append('<td>' + member.last_login_ip + '</td>')
          row.append('<td><a href="' + member.transactionLogLink + '">View Log</a></td>')
          row.append(
            '<td><div class="options-container"><div class="icon">&#9776;</div><ul class="options"><li>Option 1</li><li>Option 2</li><li>Option 3</li></ul></div></td>'
          )

          // Append the row to the table body
          tableBody.append(row)
        })
      },
      error: function (xhr, status, error) {
        console.error('Error fetching data:', error)
        if (error) {
          const loading = document.getElementById('loading-wager-table')
          loading.innerText = 'an error ocured'
          loading.style.color = 'red'
        }
      }
    })

    // Toggle options on icon click
    $('.icon').click(function () {
      // Hide all other options
      $('.options').not($(this).siblings('.options')).hide()
      // Toggle options related to the clicked icon
      $(this).siblings('.options').toggle()
    })

    // Hide options when clicking outside the container
    $(document).on('click', function (event) {
      if (!$(event.target).closest('.options-container').length) {
        $('.options').hide()
      }
    })
    reportTables(serverUrl + '/admin/gamereport', '#game-report-table')
    reportTables(serverUrl + '/admin/report', '#daily-report-table')
    function reportTables(url, id) {
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log(res)

          const tbody = $(id)

          function appendDataToTable(data, prefix = '') {
            $.each(data, function (key, value) {
              if (typeof value === 'object' && value !== null) {
                appendDataToTable(value, key + '_')
              } else {
                const row = $('<tr>')
                row.append($('<td>').text(prefix + key))
                row.append($('<td>').text(value))
                tbody.append(row)
              }
            })
          }

          appendDataToTable(res)
        },
        error: function (xhr, status, error) {
          console.error('Error fetching data:', error)
        }
      })
    }
    // jQuery event handler for signup button click
    // $('#signupForm').submit('click', function (e) {
    //   e.preventDefault()
    //   //  Firebase configuration
    //   const firebaseConfig = {
    //     apiKey: 'AIzaSyDzTvAEBt59YRXXHcddEN-jPCpYL17zYRQ',
    //     authDomain: 'dotplayplay-1692584380329.firebaseapp.com',
    //     projectId: 'dotplayplay-1692584380329',
    //     storageBucket: 'dotplayplay-1692584380329.appspot.com',
    //     messagingSenderId: '934101502841',
    //     appId: '1:934101502841:web:7c618c3beffda794a3bda8'
    //   }

    //   // Initialize Firebase
    //   const app = firebase.initializeApp(firebaseConfig)

    //   // Initialize Firebase Authentication
    //   const auth = firebase.auth(app)

    //   const email = $('#email').val()
    //   const password = $('#password').val()

    //   // Create user with email and password using Firebase
    //   auth
    //     .createUserWithEmailAndPassword(email, password)
    //     .then(userCredential => {
    //       // User signed up successfully
    //       const userId = userCredential.user.uid
    //       console.log('User signed up. UserID:', userId)

    //       // Add user ID to the form data
    //       $('#signupForm').append('<input type="hidden" name="user_id" value="' + userId + '">')

    //       // Collect all form data
    //       var formData = $('#signupForm').serialize()
    //       console.log(formData)

    //       // Send complete data to the second server
    //       $.ajax({
    //         url: serverUrl+'/admin/create', // Replace with your actual second server endpoint
    //         method: 'POST',
    //         data: formData,
    //         success: function (secondServerResponse) {
    //           console.log('User created successfully:', secondServerResponse)
    //           // Add any additional logic or UI updates here
    //         },
    //         error: function (xhr, status, error) {
    //           console.error('Error sending data to the second server:', error)
    //           // Handle errors or display error messages
    //         }
    //       })
    //     })
    //     .catch(error => {
    //       // Handle errors
    //       const errorCode = error.code
    //       const errorMessage = error.message
    //       console.error('Error signing up:', errorCode, errorMessage)
    //     })
    // })
  })
})(jQuery)

// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   apiKey: 'AIzaSyDzTvAEBt59YRXXHcddEN-jPCpYL17zYRQ',
//   authDomain: 'dotplayplay-1692584380329.firebaseapp.com',
//   projectId: 'dotplayplay-1692584380329',
//   storageBucket: 'dotplayplay-1692584380329.appspot.com',
//   messagingSenderId: '934101502841',
//   appId: '1:934101502841:web:7c618c3beffda794a3bda8'
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)

// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app)

// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

// createUserWithEmailAndPassword(auth, email, password)
//   .then(userCredential => {
//     // Signed up
//     const userId = userCredential.user.uid
//     // ...
//   })
//   .catch(error => {
//     const errorCode = error.code
//     const errorMessage = error.message
//     // ..
//   })
