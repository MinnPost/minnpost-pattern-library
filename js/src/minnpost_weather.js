/**
 * @file
 * Main JS file for the MinnPost Weather module.
 */
(function($, w, d, undefined) {
  var iconPrefix = 'https://s3.amazonaws.com/data.minnpost/icons/ham-weather-icons/';

  Drupal.theme.prototype.minnpostWeatherTop = function(resp) {
    var output = '';
    output += '<a href="' + Drupal.settings.basePath + 'weather" class="minnpost-weather-top-inner" title="Weather around ' + resp.place.name + ': ' + resp.ob.weather + '">';
    output += '  <img src="' + iconPrefix + resp.ob.icon + '" class="weather-icon" />';
    output += '  <span class="weather-temperature">' + resp.ob.tempF + '&deg;F</span>';
    output += '</a>';
    return output;
  };

  Drupal.behaviors.minnpostWeather = function() {
    // The usual behavior check to ensure this doesn't get called
    // multiple times
    if ($('body').hasClass('minnpost-weather')) {
      return;
    }
    else {
      $('body').addClass('minnpost-weather')
    }

    // Check for hostname to determine which key to use.  Keys are
    // in the repository as they are out in the open anyway, and
    // HAM Weather checks domains and will stop widget if it
    // comes from a domain that is not registered.
    var api = {
      client_id: '5R05o9cJLqREMgIU9uVoO',
      client_secret: 'l0lN3eBsJAuHbYj3Gzaqdwqs0HXIHriyanLDuVKp'
    };
    if (document.location.hostname === 'stage.minnpost.com.228elmp01.blackmesh.com') {
      api = {
        client_id: '5R05o9cJLqREMgIU9uVoO',
        client_secret: 'IWdo9yudrvvKgGwzLsioVpdytiU6lLxfY2mjwd3R'
      };
    }
    else if (document.location.hostname === 'localhost') {
      api = {
        client_id: '5R05o9cJLqREMgIU9uVoO',
        client_secret: 'mBulBLEwVXDpWRJvbKXOePmhShm9wDQ4hkB9fP4J'
      };
    }

    var request = '//api.aerisapi.com/observations/:auto';
    request += '?client_id=' + api.client_id + '&client_secret=' + api.client_secret;
    request += '&callback=?';

    try {
      $.getJSON(request, function(data) {
        if (data.success === true) {
          $('.minnpost-weather-top').html(Drupal.theme('minnpostWeatherTop', data.response));
          $('.minnpost-weather-top').fadeIn();
        }
      });
    }
    catch (e) {
      window.console && console.log(e);
    }
  };
})(jQuery, window, document);
