// Generated by CoffeeScript 1.4.0
(function() {
  var SWATCH_D, active_color, active_line, canvas, drag, drawing_data, lines_layer, palette, redraw, render_line, swatches, trash_btn, ui;

  SWATCH_D = 22;

  render_line = d3.svg.line().x(function(d) {
    return d[0];
  }).y(function(d) {
    return d[1];
  }).interpolate('basis');

  drawing_data = {
    lines: [
      {
        color: "#20b2aa",
        points: [[451, 448], [447, 447], [442, 445], [430, 440], [417, 433], [411, 429], [405, 424], [398, 420], [385, 410], [372, 398], [366, 392], [360, 385], [354, 378], [348, 370], [343, 362], [338, 354], [333, 346], [329, 337], [326, 328], [322, 318], [319, 309], [316, 299], [314, 289], [313, 279], [312, 269], [312, 259], [314, 239], [316, 228], [317, 218], [319, 209], [322, 199], [326, 190], [330, 181], [334, 172], [339, 164], [344, 156], [350, 149], [355, 143], [362, 136], [368, 131], [375, 125], [383, 120], [390, 115], [398, 111], [406, 107], [423, 99], [431, 96], [440, 93], [449, 90], [458, 87], [467, 86], [495, 83], [505, 83], [514, 83], [524, 84], [534, 85], [543, 87], [552, 89], [566, 95], [578, 101], [589, 106], [598, 112], [607, 118], [615, 125], [622, 131], [629, 138], [635, 146], [641, 153], [652, 169], [661, 185], [665, 194], [671, 210], [674, 218], [676, 226], [677, 234], [678, 241], [679, 249], [678, 264], [677, 271], [676, 279], [674, 286], [671, 293], [664, 307], [660, 313], [655, 320], [650, 326], [638, 338], [631, 344], [624, 349], [609, 359], [593, 367], [585, 370], [567, 375], [558, 378], [548, 379], [529, 382], [511, 383], [493, 382], [484, 381], [475, 379], [450, 371], [443, 367], [435, 363], [428, 358], [422, 353], [416, 347], [406, 335], [398, 321], [395, 314], [393, 307], [389, 292], [388, 277], [389, 261], [393, 239], [398, 226], [408, 207], [412, 202], [417, 197], [422, 192], [427, 188], [438, 181], [449, 176], [462, 172], [475, 169], [494, 168], [508, 168], [521, 170], [539, 176], [551, 182], [556, 185], [561, 188], [570, 196], [576, 205], [583, 220], [585, 224], [586, 231], [587, 243], [587, 255], [586, 260], [583, 270], [581, 275], [578, 279], [573, 285], [567, 290], [557, 297], [546, 302], [530, 307], [519, 309], [507, 309], [491, 307], [480, 304], [471, 299], [467, 296], [463, 294], [456, 287], [449, 276], [448, 272], [447, 268], [446, 260], [447, 252], [452, 240], [456, 232], [462, 226], [469, 220], [476, 217], [485, 214], [498, 211], [506, 211], [514, 213], [525, 218], [531, 222], [534, 225], [536, 227], [540, 233], [543, 239], [544, 245], [544, 253], [542, 257], [537, 263], [535, 265], [529, 269], [524, 271], [521, 271], [519, 271], [517, 272], [511, 271], [507, 270], [502, 267], [501, 265], [497, 261], [496, 259], [494, 257], [491, 245], [492, 242], [493, 239], [497, 237]]
      }
    ]
  };

  active_line = null;

  active_color = "#ffa07a";

  canvas = d3.select('#canvas');

  lines_layer = canvas.append('g');

  ui = d3.select('#ui');

  palette = ui.append('g').attr({
    transform: "translate(" + (4 + SWATCH_D / 2) + "," + (4 + SWATCH_D / 2) + ")"
  });

  swatches = palette.selectAll('swatch').data(["#ffa07a", "#cd5c5c", "#40e0d0", "#20b2aa", "#000000", "#ff0000", "#FFFF00", "#0000ff", "#228B22", "#ffffff"]);

  trash_btn = ui.append('text').html('&#xf1f8;').attr({
    "class": 'btn',
    dy: '0.35em',
    transform: 'translate(940,20)'
  }).on('click', function() {
    drawing_data.lines = [];
    return redraw();
  });

  swatches.enter().append('circle').attr({
    "class": 'swatch',
    cx: function(d, i) {
      return i * (SWATCH_D + 4) / 2;
    },
    cy: function(d, i) {
      if (i % 2) {
        return SWATCH_D;
      } else {
        return 0;
      }
    },
    r: SWATCH_D / 2,
    fill: function(d) {
      return d;
    }
  }).on('click', function(d) {
    active_color = d;
    swatches.classed('active', false);
    return d3.select(this).classed('active', true);
  });

  swatches.each(function(d) {
    if (d === active_color) {
      return d3.select(this).classed('active', true);
    }
  });

  drag = d3.behavior.drag();

  drag.on('dragstart', function() {
    active_line = {
      points: [],
      color: active_color
    };
    drawing_data.lines.push(active_line);
    return redraw(active_line);
  });

  drag.on('drag', function() {
    active_line.points.push(d3.mouse(this));
    return redraw(active_line);
  });

  drag.on('dragend', function() {
    if (active_line.points.length === 0) {
      drawing_data.lines.pop();
    }
    active_line = null;
    return console.log(drawing_data);
  });

  canvas.call(drag);

  redraw = function(specific_line) {
    var lines;
    lines = lines_layer.selectAll('.line').data(drawing_data.lines);
    lines.enter().append('path').attr({
      "class": 'line',
      stroke: function(d) {
        return d.color;
      }
    }).each(function(d) {
      return d.elem = d3.select(this);
    });
    if (specific_line != null) {
      specific_line.elem.attr({
        d: function(d) {
          return render_line(d.points);
        }
      });
    } else {
      lines.attr({
        d: function(d) {
          return render_line(d.points);
        }
      });
    }
    return lines.exit().remove();
  };

  redraw();

}).call(this);
