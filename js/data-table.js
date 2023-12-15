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
        const newData = res.data
        if (newData) {
          const loading = document.getElementById('loading-member-table')
          loading.innerText = newData < 1 ? 'No current loss Ranking' : ''
        }
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
        const loading = document.getElementById('loading-member-table')
        console.log('load gotten')
        loading.innerText = 'an error ocured'
        loading.style.color = 'red'
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
          if (res.data) {
            const loading = document.getElementById('loading-daily')
            loading.innerText = res.data.length < 1 ? 'No current loss Ranking' : ''
          }
          var tableBody = $(id)

          // Clear existing data in the table
          tableBody.empty()

          // Iterate over each member data and append a new row
          $.each(res.data, function (index, member) {
            var row = $('<tr>')
            row.append('<td>' + member.user_id + '</td>')
            row.append('<td>' + member.username + '</td>')
            row.append('<td>' + member.totalWagered.toFixed(2) + '</td>')
            row.append('<td>' + member.totalPayout.toFixed(2) + '</td>')
            row.append('<td>' + member.ggr.toFixed(2) + '</td>')

            // Append the row to the table body
            tableBody.append(row)
          })
        },

        error: function (xhr, status, error) {
          console.error('Error fetching data:', error)
          const loading = document.getElementById('loading-daily')
          loading.innerText = ' an error ocurred'
          loading.style.color = 'red'
        }
      })
    }
    $.ajax({
      url: serverUrl + '/admin/ggrreport',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res.data) {
          const loading = document.getElementById('loading-ggr')
          loading.innerText = res.data.length < 1 ? 'No current loss Ranking' : ''
        }
        renderGgrRanking(res.data)
      },
      error: function (xhr, status, error) {
        console.error('Error fetching data:', error)
        const loading = document.getElementById('loading-ggr')
        loading.innerText = ' an error ocurred'
        loading.style.color = 'red'
      }
    })

    // Function to render data in the member table
    function renderGgrRanking(data) {
      var tableBody = $('#ggr-report-table')

      // Clear existing data in the table
      tableBody.empty()

      // Iterate over each member data and append a new row
      $.each(data, function (index, member) {
        var row = $('<tr>')
        row.append('<td>' + member.user_id + '</td>')
        row.append('<td>' + member.username + '</td>')
        row.append('<td>' + member.totalWagered.toFixed(2) + '</td>')
        row.append('<td>' + member.totalPayout.toFixed(2) + '</td>')
        row.append('<td>' + member.ggr.toFixed(2) + '</td>')

        // Append the row to the table body
        tableBody.append(row)
      })
    }
  })
})(jQuery)
