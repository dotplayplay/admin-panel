;(function ($) {
  'use strict'
  $(function () {
    $('#profile-rating').barrating({
      theme: 'css-stars',
      showSelectedRating: false
    })
    var urlParams = new URLSearchParams(window.location.search)
    var userId = urlParams.get('id')
    if (!userId) {
      // Redirect the user to another page (e.g., index.html)
      window.location.href = '/administration/pages/memberManagement.html'
    }
    //console.log(userId)
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
        $('#createdAt').text(
          new Date(res.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        )
        $('#last-login-at').text(
          new Date(res.lastLoginAt).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        )
        $('#provider').text(res.provider)
        $('#email-verified').text(res.emailVerified)
        $('#last-login-ip').text(res.last_login_ip)
        $('#next-login-point').text(res.next_level_point)
        $('#hide-profile').prop('checked', res.hide_profile)
        $('#hidden-from-public').prop('checked', res.hidden_from_public)
        $('#refuse-friends-request').text(res.refuse_friends_request)
        $('#refuse-tips').prop('checked', res.refuse_tips)
        $('#vip-level').text(res.vip_level)
        $('#profile-image').attr('src', res.profile_image)
        $('#kyc').prop('checked', res.kyc_is_activated)
        //console.log(res.total_wagered)
        $('#total-wagered').text(res.total_wagered.toFixed(2))
        $('#invitation-code').text(res.invited_code)
        $('#google-auth-activated').text(res.google_auth_is_activated)
        $('#Suspended').text(res.is_suspend)
        $('#vip-progress').text(res.vip_progress)
        $('#fa-activated').prop('checked', res.fa_is_activated)
        $('#earn-me').text(res.earn_me)
        $('#commision-reward').text(res.commission_reward)
        $('#usd-reward').text(res.usd_reward)
        $('#joined-at').text(
          new Date(res.joined_at).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        )
        $('#account-type').text(res.account_type)
        $('#total-chat').text(res.total_chat_messages)
        $('#Weekly-wagered').text(res.weekly_wagered)
        $('#monthly-wagered').text(res.monthly_wagered)
        $('#userid').text(res.user_id)
        $('#roll-point-game').prop('checked', true)
        $('#send-rain').prop('checked', true)
        $('#receive-rain').prop('checked', true)
        $('#sending-coindrop').prop('checked', true)
        $('#recieving-coindrop').prop('checked', true)
      },

      error: function (xhr, status, error) {
        console.error('Error fetching data:', error)
        window.location.href = '/administration/pages/memberManagement.html'
      }
    })
  })
})(jQuery)
