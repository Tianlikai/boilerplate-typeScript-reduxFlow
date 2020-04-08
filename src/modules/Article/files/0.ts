export const MUST_KNOW_CSS = `
<h2 id="1-position-">1. position 都有哪几种定位方式，你能讲解一下吗？</h2>
<p>position 总共有四种定位方式，分别是：</p>
<ul>
<li>static 无特殊定位</li>
<li>relative 相对定位，相对于其文档流中的位置进行定位,并且该元素会继续保留其在文档流中的位置</li>
<li>absolute 绝对定位，相对于其最近<code>position</code>属性不为<code>static</code>的父元素进行定位，该元素会<code>脱离常规文档流</code></li>
<li>fixed 固定定位，相对于游览器进行定位，但是当其<code>任意一个父元素具有transform属性时fixed会失效</code></li>
</ul>
<h2 id="2-">2. 盒子模型</h2>
<p>一个盒子模型由外到内一共由四部分组成：<code>margin</code>,<code>border</code>,<code>padding</code>,<code>content</code>。margin，border，padding 分别是 css 属性，content 则是 html 元素的内容。</p>
<p>常用的盒子模型有两种，可以通过 css 属性<code>box-content</code>进行设置：</p>
<ul>
<li><code>inherit</code> 从父元素继承 box-content 属性</li>
<li><code>content-box</code> 标准盒子模型，为<code>默认值</code>，设定的 <code>width</code>和<code>height</code> 就是元素的 <code>content</code> 大小</li>
<li><code>border-box</code> ie 盒子模型，设定的<code>width</code>和<code>height</code>包含元素的<code>content, padding和border</code></li>
</ul>
<h2 id="3-bfc-bfc-bfc-">3. 你能描述一下 BFC 吗？什么情况下会触发 BFC? BFC 的渲染规则？应用场景有哪些?</h2>
<h3 id="3-1-bfc">3.1. 什么是 BFC</h3>
<p>在 W3C 的定义如下：浮动元素，绝对定位元素，非块级盒子的块级容器，以及 overflow 不为 visible 的元素都会为它们的内容创建一个 BFC 块级格式化上下文。</p>
<h3 id="3-2-bfc">3.2. 那些情况会触发 BFC</h3>
<ul>
<li>根元素</li>
<li>浮动元素</li>
<li>行内块元素 inline-block</li>
<li>绝对定位元素和固定定位元素</li>
<li>overflow 不为 visible 的元素</li>
<li>设置为弹性盒子 flex</li>
<li>设置为 table</li>
</ul>
<h3 id="3-3-bfc-">3.3. BFC 的渲染规则如下</h3>
<ul>
<li>(1) BFC 垂直方向的 margin 会发生重叠</li>
<li>(2) BFC 不会和浮动元素发生重叠</li>
<li>(3) BFC 是一块独立的渲染区域，内外元素不会相互影响</li>
<li>(4) BFC 计算高度时，会将浮动元素包含在内</li>
</ul>
<h3 id="3-4-bfc-">3.4. BFC 有那些应用场景</h3>
<h4 id="3-4-1-">3.4.1. 防止父级元素高度塌陷</h4>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
      * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
      }
      <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#888</span>;
        <span class="hljs-attribute">overflow</span>: hidden; <span class="hljs-comment">/* 生成BFC 解决高度塌陷问题*/</span>
      }
      <span class="hljs-selector-class">.left</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#73de80</span>; <span class="hljs-comment">/* 绿色 */</span>
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#f31264</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">float</span>: left;
      }
      <span class="hljs-selector-class">.right</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ef5be2</span>; <span class="hljs-comment">/* 粉色 */</span>
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#f31264</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100px</span>;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h4 id="3-4-2-margin-">3.4.2. 解决垂直方向 margin 重叠问题</h4>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
      * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
      }
      <span class="hljs-selector-class">.box1</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#73de80</span>; <span class="hljs-comment">/* 绿色 */</span>
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">display</span>: inline-block; <span class="hljs-comment">/* 生成BFC 解决边距重叠问题*/</span>
      }
      <span class="hljs-selector-class">.box2</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ef5be2</span>; <span class="hljs-comment">/* 粉色 */</span>
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="4-">4. 水平垂直居中方案大全</h2>
`;
