// Generated by CoffeeScript 1.12.6
(function() {
  var $, addCloneFromComments, addField, captionedButton, createCloneAction, quoteText;

  $ = jQuery;

  captionedButton = function(symbol, text) {
    if (ui.use_symbols) {
      return symbol;
    } else {
      return symbol + " " + text;
    }
  };

  addField = function(form, name, value) {
    value = value != null ? $.htmlEscape(value) : '';
    return form.append($("<input type=\"hidden\" name=\"field_" + name + "\" value=\"" + value + "\">"));
  };

  createCloneAction = function(title) {
    var form, name, oldvalue;
    form = $("<form action=\"" + newticket_href + "\" method=\"post\">\n <div class=\"inlinebuttons\">\n  <input type=\"submit\" name=\"clone\"\n         value=\"" + (captionedButton('+', _('Clone'))) + "\"\n         title=\"" + title + "\">\n  <input type=\"hidden\" name=\"__FORM_TOKEN\" value=\"" + form_token + "\">\n  <input type=\"hidden\" name=\"preview\" value=\"\">\n </div>\n</form>");
    for (name in old_values) {
      oldvalue = old_values[name];
      if (name !== "id" && name !== "summary" && name !== "description" && name !== "status" && name !== "resolution" && name !== "reporter") {
        addField(form, name, oldvalue);
      }
    }
    return form;
  };

  addCloneFromComments = function(changes) {
    var btns, c, cform, form, i, len, results;
    form = createCloneAction(_("Create a new ticket from this comment"));
    results = [];
    for (i = 0, len = changes.length; i < len; i++) {
      c = changes[i];
      btns = $("#trac-change-" + c.cnum + "-" + c.date + " .trac-ticket-buttons");
      if (btns.length) {
        cform = form.clone();
        addField(cform, 'summary', _("(part of #%(ticketid)s) %(summary)s", {
          ticketid: old_values.id,
          summary: old_values.summary
        }));
        addField(cform, 'description', _("Copied from [%(source)s]:\n%(description)s", {
          source: "ticket:" + old_values.id + "#comment:" + c.cnum,
          description: quoteText(c.comment)
        }));
        results.push(btns.prepend(cform));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  $(function() {
    var c, clone;
    clone = createCloneAction(_("Create a copy of this ticket"));
    addField(clone, 'summary', _("%(summary)s (cloned)", {
      summary: old_values.summary
    }));
    addField(clone, 'description', _("Cloned from #%(id)s:\n%(description)s", {
      id: old_values.id,
      description: quoteText(old_values.description)
    }));
    $('#ticket .description .searchable').before(clone);
    if ((typeof old_values !== "undefined" && old_values !== null) && (typeof changes !== "undefined" && changes !== null)) {
      return addCloneFromComments((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = changes.length; i < len; i++) {
          c = changes[i];
          if ((c.cnum != null) && c.comment && c.permanent) {
            results.push(c);
          }
        }
        return results;
      })());
    }
  });

  quoteText = function(text) {
    var length, pattern, repl;
    if (text) {
      length = text.length;
      pattern = /\r\n|[\r\n\u000b\u000c\u001c\u001d\u001e\u0085\u2028\u2029]/g;
      repl = function(match, offset) {
        if (match.length + offset !== length) {
          return '\n> ';
        } else {
          return '';
        }
      };
      return '> ' + text.replace(pattern, repl) + '\n';
    } else {
      return '';
    }
  };

}).call(this);
