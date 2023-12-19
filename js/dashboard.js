;(function ($) {
  'use strict'
  $(function () {
    console.log(serverUrl)
    const backgroundColors = {
      January: '#3498db',
      Febuary: '#e74c3c',
      March: '#2ecc71',
      April: '#f39c12',
      May: '#1abc9c',
      June: '#9b59b6',
      July: '#e67e22',
      August: '#2c3e50',
      September: '#27ae60',
      October: '#c0392b',
      November: '#7f8c8d',
      December: '#d35400'
    }

    const borderColors = {
      January: '#2980b9',
      Febuary: '#c0392b',
      March: '#27ae60',
      April: '#d68910',
      May: '#16a085',
      June: '#8e44ad',
      July: '#d35400',
      August: '#1f2c39',
      September: '#229954',
      October: '#a93226',
      November: '#626567',
      December: '#ba4e00'
    }
    if ($('#orders-chart').length) {
      var currentChartCanvas = $('#orders-chart').get(0).getContext('2d')
      var currentChart = new Chart(currentChartCanvas, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Delivered',
              data: [260, 380, 230, 400, 780, 530, 340, 200, 400, 650, 780, 500],
              backgroundColor: '#392c70'
            },
            {
              label: 'Estimated',
              data: [480, 600, 510, 600, 1000, 570, 500, 350, 450, 710, 820, 650],
              backgroundColor: '#d1cede'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 20,
              bottom: 0
            }
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  drawBorder: false
                },
                ticks: {
                  stepSize: 250,
                  fontColor: '#686868'
                }
              }
            ],
            xAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  fontColor: '#686868'
                },
                gridLines: {
                  display: false
                },
                barPercentage: 0.4
              }
            ]
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          },
          legendCallback: function (chart) {
            var text = []
            text.push('<ul class="legend' + chart.id + '">')
            for (var i = 0; i < chart.data.datasets.length; i++) {
              text.push(
                '<li><span class="legend-label" style="background-color:' +
                  chart.data.datasets[i].backgroundColor +
                  '"></span>'
              )
              if (chart.data.datasets[i].label) {
                text.push(chart.data.datasets[i].label)
              }
              text.push('</li>')
            }
            text.push('</ul>')
            return text.join('')
          }
        }
      })
      document.getElementById('orders-chart-legend').innerHTML = currentChart.generateLegend()
    }
    if ($('#sales-chart').length) {
      var lineChartCanvas = $('#sales-chart').get(0).getContext('2d')
      var data = {
        labels: ['2013', '2014', '2014', '2015', '2016', '2017', '2018'],
        datasets: [
          {
            label: 'Support',
            data: [1500, 7030, 1050, 2300, 3510, 6800, 4500],
            borderColor: ['#392c70'],
            borderWidth: 3,
            fill: false
          },
          {
            label: 'Product',
            data: [5500, 4080, 3050, 5600, 4510, 5300, 2400],
            borderColor: ['#d1cede'],
            borderWidth: 3,
            fill: false
          }
        ]
      }
      var options = {
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false
              },
              ticks: {
                stepSize: 2000,
                fontColor: '#686868'
              }
            }
          ],
          xAxes: [
            {
              display: false,
              gridLines: {
                drawBorder: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 3
          }
        },
        stepsize: 1
      }
      var lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: data,
        options: options
      })
    }
    if ($('#sales-status-chart').length) {
      var pieChartCanvas = $('#sales-status-chart').get(0).getContext('2d')
      var pieChart = new Chart(pieChartCanvas, {
        type: 'pie',
        data: {
          datasets: [
            {
              data: [75, 25, 15, 10],
              backgroundColor: ['#392c70', '#04b76b', '#ff5e6d', '#eeeeee'],
              borderColor: ['#392c70', '#04b76b', '#ff5e6d', '#eeeeee']
            }
          ],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: ['Active users', 'Subscribers', 'New visitors', 'Others']
        },
        options: {
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true
          },
          legend: {
            display: false
          },
          legendCallback: function (chart) {
            var text = []
            text.push('<ul class="legend' + chart.id + '">')
            for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
              text.push(
                '<li><span class="legend-label" style="background-color:' +
                  chart.data.datasets[0].backgroundColor[i] +
                  '"></span>'
              )
              if (chart.data.labels[i]) {
                text.push(chart.data.labels[i])
              }
              text.push(
                '<label class="badge badge-light badge-pill legend-percentage ml-auto">' +
                  chart.data.datasets[0].data[i] +
                  '%</label>'
              )
              text.push('</li>')
            }
            text.push('</ul>')
            return text.join('')
          }
        }
      })
      document.getElementById('sales-status-chart-legend').innerHTML = pieChart.generateLegend()
    }
    if ($('#registered-users-chart').length) {
      $.ajax({
        url: serverUrl + '/admin/userstats',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          console.log(data)
          if (data) {
            const loading = document.getElementById('loading-user')
            loading.innerText = ''
          }
          const months = data.registeredUser.map(item => item.month)

          const backgroundColor = data.registeredUser.map(item => backgroundColors[item.month])
          const borderColor = data.registeredUser.map(item => borderColors[item.month])

          const totalUsers = data.registeredUser.reduce((sum, monthData) => sum + monthData.noOfRegisteredUsers, 0)
          const percentages = data.registeredUser.map(monthData =>
            ((monthData.noOfRegisteredUsers / totalUsers) * 100).toFixed(2)
          )

          var pieChartCanvas = $('#registered-users-chart').get(0).getContext('2d')
          var pieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: {
              datasets: [
                {
                  data: percentages,
                  backgroundColor,
                  borderColor
                }
              ],

              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: months
            },
            options: {
              responsive: true,
              animation: {
                animateScale: true,
                animateRotate: true
              },
              legend: {
                display: false
              },
              legendCallback: function (chart) {
                var text = []
                text.push('<ul class="legend' + chart.id + '">')
                for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
                  text.push(
                    '<li><span class="legend-label" style="background-color:' +
                      chart.data.datasets[0].backgroundColor[i] +
                      '"></span>'
                  )
                  if (chart.data.labels[i]) {
                    text.push(chart.data.labels[i])
                  }
                  text.push(
                    '<label class="badge badge-light badge-pill legend-percentage ml-auto">' +
                      chart.data.datasets[0].data[i] +
                      '%</label>'
                  )
                  text.push('</li>')
                }
                text.push('</ul>')
                return text.join('')
              }
            }
          })
          document.getElementById('registered-users-chart-legend').innerHTML = pieChart.generateLegend()
        },
        error: function (xhr, status, error) {
          console.error('Error fetching data:', error)
          if (error) {
            const loading = document.getElementById('loading-user')
            loading.innerText = 'An error ocurred try refreshing'
            loading.style.color = 'red'
          }
        }
      })
    }
    if ($('#wagered-won-chart').length) {
      $.ajax({
        url: serverUrl + '/admin/wageredwonstats',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          console.log(data)
          if (data) {
            const loading = document.getElementById('loading-wager')
            loading.innerText = ''
            if (data.totalWagered.length < 1) {
              loading.innerText = 'No current data to be displayed'
            }
          }
          const months = data.totalWagered.map(item => item.month)
          const backgroundColor = data.totalWagered.map(item => backgroundColors[item.month])
          const borderColor = data.totalWagered.map(item => borderColors[item.month])

          const totalUsers = data.totalWagered.reduce((sum, monthData) => sum + monthData.totalAmount, 0)
          const percentages = data.totalWagered.map(monthData =>
            ((monthData.totalAmount / totalUsers) * 100).toFixed(2)
          )

          var pieChartCanvas = $('#wagered-won-chart').get(0).getContext('2d')
          var pieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: {
              datasets: [
                {
                  data: percentages,
                  backgroundColor,
                  borderColor
                }
              ],

              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: months
            },
            options: {
              responsive: true,
              animation: {
                animateScale: true,
                animateRotate: true
              },
              legend: {
                display: false
              },
              legendCallback: function (chart) {
                var text = []
                text.push('<ul class="legend' + chart.id + '">')
                for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
                  text.push(
                    '<li><span class="legend-label" style="background-color:' +
                      chart.data.datasets[0].backgroundColor[i] +
                      '"></span>'
                  )
                  if (chart.data.labels[i]) {
                    text.push(chart.data.labels[i])
                  }
                  text.push(
                    '<label class="badge badge-light badge-pill legend-percentage ml-auto">' +
                      chart.data.datasets[0].data[i] +
                      '%</label>'
                  )
                  text.push('</li>')
                }
                text.push('</ul>')
                return text.join('')
              }
            }
          })
          document.getElementById('wagered-won-chart-legend').innerHTML = pieChart.generateLegend()
        },
        error: function (xhr, status, error) {
          console.error('Error fetching data:', error)
          if (error) {
            const loading = document.getElementById('loading-wager')
            loading.innerText = 'An error ocurred try refreshing'
            loading.style.color = 'red'
          }
        }
      })
    }
    if ($('#daily-sales-chart').length) {
      var dailySalesChartData = {
        datasets: [
          {
            data: [50, 10, 10, 30],
            backgroundColor: ['#392c70', '#04b76b', '#e9e8ef', '#ff5e6d'],
            borderWidth: 0
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ['Mail order sales', 'Instore sales', 'Download sales', 'Sales return']
      }
      var dailySalesChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        legend: {
          display: false
        },
        legendCallback: function (chart) {
          var text = []
          text.push('<ul class="legend' + chart.id + '">')
          for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
            text.push(
              '<li><span class="legend-label" style="background-color:' +
                chart.data.datasets[0].backgroundColor[i] +
                '"></span>'
            )
            if (chart.data.labels[i]) {
              text.push(chart.data.labels[i])
            }
            text.push('</li>')
          }
          text.push('</ul>')
          return text.join('')
        },
        cutoutPercentage: 70
      }
      var dailySalesChartCanvas = $('#daily-sales-chart').get(0).getContext('2d')
      var dailySalesChart = new Chart(dailySalesChartCanvas, {
        type: 'doughnut',
        data: dailySalesChartData,
        options: dailySalesChartOptions
      })
      document.getElementById('daily-sales-chart-legend').innerHTML = dailySalesChart.generateLegend()
    }
    if ($('#inline-datepicker-example').length) {
      $('#inline-datepicker-example').datepicker({
        enableOnReadonly: true,
        todayHighlight: true
      })
    }
    // Fetch data for pending Withdrawals
    fetchDataAndRender('server_endpoint', 'pendingWithdrawals')

    // Fetch data for pending Claim
    fetchDataAndRender('server_endpoint', 'pendingClaim')

    // Fetch data for pending Deposit
    fetchDataAndRender('server_endpoint', 'pendingDeposit')

    // Reusable function to fetch data and render for a specific table
    function fetchDataAndRender(endpoint, containerId) {
      $.ajax({
        url: endpoint,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          renderData(data, containerId)
        },
        error: function (xhr, status, error) {
          console.error('Error fetching data:', error)
        }
      })
    }

    // Reusable function to render data in the specified format for a specific container
    function renderData(data, containerId) {
      var container = $('#' + containerId)

      // Clear existing data in the container
      container.empty()

      // Iterate over each data object and append a new row
      $.each(data, function (index, item) {
        var row = $('<tr>')
        row.append('<td class="font-weight-bold">' + item.name + '</td>')
        row.append('<td class="text-muted">' + item.code + '</td>')
        row.append('<td>' + item.quantity + '</td>')
        row.append('<td><label class="badge badge-success badge-pill">' + item.status + '</label></td>')

        // Append the row to the container
        container.append(row)
      })
    }
    function fetchShowValues() {
      $.ajax({
        url: serverUrl + '/admin/dashboard',
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          const data = res.data
          if (data) {
            const loadings = document.querySelectorAll('#loading')

            loadings.forEach(function (element) {
              element.textContent = ''
            })
          }
          console.log(data)
          // Get each of the displayed elements using jQuery
          $('#total-deposited-players').text('$' + parseInt(data.totalDepositedPlayers).toFixed(4))
          $('#total-deposited-players-type').text(
            `${data.totalDepositedPlayers.percent} ${data.totalDepositedPlayers.type}`
          )
          $('#total-gross-gaming-revenue').text('$' + parseInt(data.grossGamingRevenue).toFixed(4))
          $('#total-gross-gaming-revenue-type').text(
            `${data.grossGamingRevenue.percent} ${data.grossGamingRevenue.type}`
          )
          $('#total-player-balance').text('$' + parseInt(data.totalPlayerBalance).toFixed(4))
          $('#total-player-balance-type').text(`${data.totalPlayerBalance.percent} ${data.totalPlayerBalance.type}`)
          $('#total-wagered-ranking').text('$' + parseInt(data.totalWagered).toFixed(4))
          $('#total-wagered-ranking-type').text(`${data.totalWagered.percent} ${data.totalWagered.type}`)
          $('#total-win-ranking').text('$' + parseInt(data.totalWon).toFixed(4))
          $('#total-win-ranking-type').text(`${data.totalWon.percent} ${data.totalWon.type}`)
          $('#total-lose-ranking').text('$' + parseInt(data.totalLoss).toFixed(4))
          $('#total-lose-ranking-type').text(`${data.totalLoss.percent} ${data.totalLoss.type}`)
        },
        error: function (xhr, status, error) {
          console.error('Error fetching data:', error)
          const loading = document.getElementById('loading')
          loading.innerText = 'unable to load data'
          loading.style.color = 'red'
        }
      })
    }

    // Trigger the fetchShowValues function on document ready
    fetchShowValues()

    $.ajax({
      url: serverUrl + '/admin/wageredranking',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res) {
          const loading = document.getElementById('loading-wager-table')
          loading.innerText = res.length < 1 ? 'No current Wager Ranking' : ''
        }
        renderWageredRanking(res)
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

    // Function to render data in the member table
    function renderWageredRanking(data) {
      var tableBody = $('#total-wagered-ranking-table')

      // Clear existing data in the table
      tableBody.empty()

      // Iterate over each member data and append a new row
      $.each(data, function (index, member) {
        var row = $('<tr>')
        row.append('<td class="py-1"><img src=' + member.profile_image + 'alt="image" /></td>')
        row.append('<td>' + member.user_id + '</td>')
        row.append('<td>' + member.username + '</td>')
        row.append('<td>' + member.vip_level + '</td>')
        row.append('<td>' + member.total_wagered.toFixed(2) + '</td>')

        // Append the row to the table body
        tableBody.append(row)
      })
    }
    $.ajax({
      url: serverUrl + '/admin/wonranking',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res) {
          const loading = document.getElementById('loading-won-table')
          loading.innerText = res.wonRanking.length < 1 ? 'No current won Ranking' : ''
        }
        renderWonRanking(res.wonRanking)
      },
      error: function (xhr, status, error) {
        console.error('Error fetching data:', error)
        if (error) {
          const loading = document.getElementById('loading-won-table')
          loading.innerText = 'an error occured'
          loading.style.color = 'red'
        }
      }
    })

    // Function to render data in the member table
    function renderWonRanking(data) {
      var tableBody = $('#total-won-ranking-table')

      // Clear existing data in the table
      tableBody.empty()

      // Iterate over each member data and append a new row
      $.each(data, function (index, member) {
        var row = $('<tr>')
        row.append('<td class="py-1"><img src=' + member.profile?.profile_image + 'alt="image" /></td>')
        row.append('<td>' + member.user_id + '</td>')
        row.append('<td>' + member.profile?.username + '</td>')
        row.append('<td>' + member.totalWon.toFixed(2) + '</td>')
        row.append('<td>' + member.profile?.vip_level + '</td>')
        row.append('<td>' + member.profile?.total_wagered.toFixed(2) + '</td>')

        // Append the row to the table body
        tableBody.append(row)
      })
    }
    $.ajax({
      url: serverUrl + '/admin/lossranking',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res) {
          const loading = document.getElementById('loading-loss-table')
          loading.innerText = res.lossRanking.length < 1 ? 'No current loss Ranking' : ''
        }
        renderLossRanking(res.lossRanking)
      },
      error: function (xhr, status, error) {
        console.error('Error fetching data:', error)
        if (error) {
          const loading = document.getElementById('loading-loss-table')
          loading.innerText = ' an error ocurred'
          loading.style.color = 'red'
        }
      }
    })

    // Function to render data in the member table
    function renderLossRanking(data) {
      var tableBody = $('#total-loss-ranking-table')

      // Clear existing data in the table
      tableBody.empty()

      // Iterate over each member data and append a new row
      $.each(data, function (index, member) {
        var row = $('<tr>')
        row.append('<td class="py-1"><img src=' + member.profile?.profile_image + 'alt="image" /></td>')
        row.append('<td>' + member.user_id + '</td>')
        row.append('<td>' + member.profile?.username + '</td>')
        row.append('<td>' + member.totalLoss.toFixed(2) + '</td>')
        row.append('<td>' + member.profile?.vip_level + '</td>')
        row.append('<td>' + member.profile?.total_wagered.toFixed(2) + '</td>')

        // Append the row to the table body
        tableBody.append(row)
      })
    }
  })
})(jQuery)
