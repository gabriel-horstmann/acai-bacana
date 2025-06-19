/******/ (() => { // webpackBootstrap
/*!******************************!*\
  !*** ./public/js/pedidos.js ***!
  \******************************/
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function loadData() {
  return _loadData.apply(this, arguments);
}
function _loadData() {
  _loadData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var pedidosTable, API, objects;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          pedidosTable = document.getElementById("pedidosTable");
          _context2.n = 1;
          return fetch("http://localhost:3000/api/pedidos");
        case 1:
          API = _context2.v;
          _context2.n = 2;
          return API.json();
        case 2:
          objects = _context2.v;
          objects.data.forEach(function (object) {
            var trPedido = document.createElement("tr");
            var tdCliente = document.createElement("td");
            var tdPedido = document.createElement("td");
            var tdStatus = document.createElement("td");
            var tdValor = document.createElement("td");
            var tdAcoes = document.createElement("td");
            tdCliente.innerHTML = object.cliente;
            tdPedido.innerHTML = object.pedido;
            tdStatus.innerHTML = object.status;
            tdValor.innerHTML = object.valor_pedido;
            tdAcoes.className = "tdAcoes";
            tdCliente.className = "data-label";
            tdPedido.className = "data-label";
            tdStatus.className = "data-label";
            tdValor.className = "data-label";
            var btnVerItens = document.createElement("button");
            btnVerItens.textContent = "Ver itens";
            btnVerItens.className = "btnVer";
            btnVerItens.onClick = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
              var existingRow, response, data, itensRow, itensTd, html;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    existingRow = document.getElementById("itens-row-".concat(object.id_pedido));
                    if (!existingRow) {
                      _context.n = 1;
                      break;
                    }
                    existingRow.remove();
                    return _context.a(2);
                  case 1:
                    _context.n = 2;
                    return fetch("http://localhost:3000/api/pedidos/".concat(object.id_pedido, "/itens"));
                  case 2:
                    response = _context.v;
                    _context.n = 3;
                    return response.json();
                  case 3:
                    data = _context.v;
                    itensRow = document.createElement("tr");
                    itensRow.id = "itens-row-".concat(object.id_pedido);
                    itensTd = document.createElement("td");
                    itensTd.colSpan = 4;
                    html = "<table class='tablePedidos'><thead><tr><th>Produto</th><th>Valor</th></tr></thead><tbody>";
                    data.data.forEach(function (item) {
                      html += "<tr><td>".concat(item.produto, "</td><td>").concat(item.preco_unit, "</td></tr>");
                    });
                    html += "</tbody></table>";
                    itensTd.innerHTML = html;
                    itensRow.appendChild(itensTd);
                    trPedido.parentNode.insertBefore(itensRow, trPedido.nextSibling);
                  case 4:
                    return _context.a(2);
                }
              }, _callee);
            }));
            var btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.className = "btnEditar";
            btnEditar.onclick = function () {
              return editarPedido(object.id_pedido);
            };
            var btnExcluir = document.createElement("button");
            btnExcluir.textContent = "Excluir";
            btnExcluir.className = "btnExcluir";
            btnExcluir.onclick = function () {
              return excluirPedido(object.id_pedido);
            };
            tdAcoes.appendChild(btnVerItens);
            tdAcoes.appendChild(btnEditar);
            tdAcoes.appendChild(btnExcluir);
            trPedido.appendChild(tdCliente);
            trPedido.appendChild(tdPedido);
            trPedido.appendChild(tdStatus);
            trPedido.appendChild(tdValor);
            trPedido.appendChild(tdAcoes);
            pedidosTable.appendChild(trPedido);
          });
        case 3:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _loadData.apply(this, arguments);
}
function editarPedido(_x) {
  return _editarPedido.apply(this, arguments);
}
function _editarPedido() {
  _editarPedido = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id) {
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          window.location.href = "editarPedido.html?id=".concat(id);
        case 1:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return _editarPedido.apply(this, arguments);
}
function excluirPedido(_x2) {
  return _excluirPedido.apply(this, arguments);
}
function _excluirPedido() {
  _excluirPedido = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id) {
    var response, error;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          console.log("teste");
          if (!confirm("Tem certeza que deseja excluir o pedido?")) {
            _context4.n = 4;
            break;
          }
          _context4.n = 1;
          return fetch("http://localhost:3000/api/pedidos/".concat(id), {
            method: "DELETE"
          });
        case 1:
          response = _context4.v;
          if (!response.ok) {
            _context4.n = 2;
            break;
          }
          alert("Pedido excluído com sucesso.");
          _context4.n = 4;
          break;
        case 2:
          _context4.n = 3;
          return response.json();
        case 3:
          error = _context4.v;
          alert("Erro ao excluir o pedido: ".concat(error.message));
        case 4:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return _excluirPedido.apply(this, arguments);
}
/******/ })()
;
//# sourceMappingURL=pedidos.bundle.js.map