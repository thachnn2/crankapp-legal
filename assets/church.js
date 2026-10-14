(function () {
  var rows = document.querySelectorAll('.sched-row[data-day]');
  if (!rows.length) return;
  var day, mins;
  try {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Ho_Chi_Minh', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    mins = (+p.hour % 24) * 60 + +p.minute;
  } catch (err) {
    var d = new Date();
    day = d.getDay();
    mins = d.getHours() * 60 + d.getMinutes();
  }
  var row = document.querySelector('.sched-row[data-day="' + day + '"]');
  if (!row) return;
  row.classList.add('is-today');
  var badge = document.createElement('span');
  badge.className = 'today-badge';
  badge.textContent = 'Hôm nay';
  row.querySelector('.sched-day').appendChild(badge);
  var next = null;
  Array.prototype.forEach.call(row.querySelectorAll('.sched-times li:not(.none)'), function (li) {
    var m = li.textContent.match(/(\d{1,2})[:h](\d{2})/);
    if (!m) return;
    if (+m[1] * 60 + +m[2] < mins) {
      li.classList.add('is-past');
    } else if (!next) {
      next = li;
      li.classList.add('is-next');
      li.title = 'Thánh lễ tiếp theo';
    }
  });
})();
