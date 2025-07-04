/******/ (() => { // webpackBootstrap
/*!***********************************!*\
  !*** ./public/js/editarPedido.js ***!
  \***********************************/
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var pedidoId = null;
var pedidoAtual = null;
function obterIdPedido() {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}
function carregarPedido() {
  return _carregarPedido.apply(this, arguments);
}
function _carregarPedido() {
  _carregarPedido = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var response, data;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          pedidoId = obterIdPedido();
          _context.n = 1;
          return fetch("http://localhost:3000/api/pedidos/".concat(pedidoId));
        case 1:
          response = _context.v;
          _context.n = 2;
          return response.json();
        case 2:
          data = _context.v;
          pedidoAtual = data.data;
          document.getElementById("cliente").value = pedidoAtual.cliente;
          document.getElementById("pedido").value = pedidoAtual.pedido;
          document.getElementById("status").value = pedidoAtual.status;
          carregarItens(pedidoAtual.itens);
        case 3:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _carregarPedido.apply(this, arguments);
}
function carregarItens(item) {
  var containerItens = document.getElementById("itensPedido");
  containerItens.innerHTML = "";
  item.forEach(function (item, index) {
    var itemElement = criarElementoItem(item, index);
    containerItens.appendChild(itemElement);
  });
}
function criarElementoItem(item) {
  var div = document.createElement("div");
  div.className = "item-row";
  var inputProduto = document.createElement("input");
  inputProduto.type = "text";
  inputProduto.placeholder = "Nome do Produto";
  inputProduto.value = item.produto;
  inputProduto.required = true;
  var inputPreco = document.createElement("input");
  inputPreco.type = "number";
  inputPreco.value = item.preco_unit;
  inputPreco.required = true;
  inputPreco.step = "0.5";
  inputPreco.min = "0.5";
  var btnRemover = document.createElement("button");
  btnRemover.type = "button";
  btnRemover.className = "btn-remover-item";
  btnRemover.textContent = "Remover";
  btnRemover.onclick = function () {
    removerItem(this);
  };
  div.appendChild(inputProduto);
  div.appendChild(inputPreco);
  div.appendChild(btnRemover);
  return div;
}
function removerItem(button) {
  var itemRow = button.parentElement;
  itemRow.remove();
}
function adicionarNovoItem() {
  var containerItens = document.getElementById("itensPedido");
  var novoItem = {
    produto: "",
    preco_unit: 0
  };
  var itemElement = criarElementoItem(novoItem, containerItens.children.length);
  containerItens.appendChild(itemElement);
}
function coletarDadosFormulario() {
  var itens = [];
  var itensElements = document.querySelectorAll(".item-row");
  itensElements.forEach(function (element) {
    var inputs = element.querySelectorAll("input");
    itens.push({
      produto: inputs[0].value,
      preco_unit: parseFloat(inputs[1].value)
    });
  });
  return {
    cliente: document.getElementById("cliente").value,
    pedido: document.getElementById("pedido").value,
    status: document.getElementById("status").value,
    itens: itens
  };
}
function salvarPedido(_x) {
  return _salvarPedido.apply(this, arguments);
}
function _salvarPedido() {
  _salvarPedido = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(event) {
    var dadosPedido;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          event.preventDefault();
          dadosPedido = coletarDadosFormulario();
          _context2.n = 1;
          return fetch("http://localhost:3000/api/pedidos/".concat(pedidoId), {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosPedido)
          });
        case 1:
          alert("Pedido atualizado com sucesso");
          voltarParaLista();
        case 2:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _salvarPedido.apply(this, arguments);
}
function voltarParaLista() {
  window.location.href = "pedidos.html";
}
/******/ })()
;
//# sourceMappingURL=editarPedido.bundle.js.map