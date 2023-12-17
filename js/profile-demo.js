;(function ($) {
  'use strict'
  $(function () {
    $('#profile-rating').barrating({
      theme: 'css-stars',
      showSelectedRating: false
    })
    var urlParams = new URLSearchParams(window.location.search)
    var userId = urlParams.get('id')
    console.log(userId)
    $.ajax({
      url: serverUrl + '/admin/member/' + userId,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)

        $('#phone').text(res.phone)
        $('#email').text(res.email)
        $('#fullname').text(`${res.firstname}  ${res.lastname}`)
        $('#username').text(res.username)
        $('#google-auth').text(res.google_auth)
        $('#createdAt').text(res.created_at)
        $('#last-login-at').text(res.lastLoginAt)
        $('#provider').text(res.provider)
        $('#email-verified').text(res.emailVerified)
        $('#last-login-ip').text(res.last_login_ip)
        $('#next-login-point').text(res.next_level_point)
        $('#hide-profile').text(res.hide_profile)
        $('#hidden-from-public').text(res.hidden_from_public)
        $('#refuse-friends-request').text(res.refuse_friends_request)
        $('#refuse-tips').text(res.refuse_tips)
        $('#vip-level').text(res.vip_level)
        $('#profile-image').attr('src', res.profile_image)
        $('#kyc').text(res.kyc_is_activated)
        $('#total-wagered').text(res.total_wagered)
        $('#invitation-code').text(res.invited_code)
        $('#google-auth-activated').text(res.google_auth_is_activated)
        $('#Suspended').text(res.is_suspend)
        $('#vip-progress').text(res.vip_progress)
        $('#fa-activated').text(res.fa_is_activated)
        $('#earn-me').text(res.earn_me)
        $('#commision-reward').text(res.commission_reward)
        $('#usd-reward').text(res.usd_reward)
        $('#joined-at').text(res.joined_at)
        $('#account-type').text(res.account_type)
        $('#total-chat').text(res.total_chat_messages)
        $('#Weekly-wagered').text(res.weekly_wagered)
        $('#monthly-wagered').text(res.monthly_wagered)
      },

      error: function (xhr, status, error) {
        console.error('Error fetching data:', error)
        // const loading = document.getElementById('loading-daily-game')
        // loading.innerText = ' an error ocurred'
        // loading.style.color = 'red'
      }
    })
  })
})(jQuery)
