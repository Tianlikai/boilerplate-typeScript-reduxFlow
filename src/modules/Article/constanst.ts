export const STRING = `
<h1 id="block-formatting-context">Block Formatting Context</h1>
<p>什么是 BFC</p>
<p><code>BFC 全称是 Block Formatting Context</code>既块级格式化上下文，是一个关于 CSS 渲染定位的概念。</p>
<h2 id="-">视觉格式化模型</h2>
<p>视觉格式化模型是用来处理文档并将它显示在视觉媒体上的机制，是一个 CSS 概念。</p>
<p>视觉格式定义了盒的生成,盒主要包括<code>块级盒</code>，<code>行内盒</code>，<code>匿名盒</code>。</p>
<p>块盒有以下特性</p>
<ul>
<li>视觉上呈现为块，竖直排列</li>
<li>参与块格式化上下文</li>
</ul>
<p>行内盒有以下特性</p>
<ul>
<li>视觉上它将内容和其它行内元素排列为多行</li>
<li>行内级元素生成行内盒，参与行内格式化上下文。同时参与生成行内格式化上下文的行内级盒子成为行内盒，所有<code>display: inline</code>的非替换元素生成的盒都是行内盒。</li>
<li>不参与生成行内格式化上下文的行内级盒成<code>原子行内级盒</code>，这些盒由可替换行内元素，或<code>display</code>为<code>inline-block</code>这样的的元素生成，不能拆分多个盒。</li>
</ul>
<p>匿名盒</p>
<p>匿名盒也有份匿名块盒与匿名行内盒，因为匿名盒没有名字，不能利用选择器来选择它们，所以它们的所有属性都为 inherit 或初始默认值；</p>
<h2 id="-">三个定位方案</h2>
<p>在定位的时候，游览器会根据元素的盒类型盒上下文对这些元素进行定位，可以说<code>盒是定位的基本单位</code>。定位时有三种定位方案<code>常规流</code>,<code>浮动</code>,<code>绝对定位</code>。</p>
<h3 id="-">常规流</h3>
<ul>
<li>在常规流中，盒一个接着一个排列。</li>
<li>在块级格式化上下文中，它们竖向排列。</li>
<li>在行内格式化上下文中，它们横向排列。</li>
<li>当<code>position</code>为<code>static</code>或<code>relative</code>,并且<code>float</code>为<code>none</code>时会触发常规流。</li>
<li>对于静态定位，盒的位置是常规流布局里的位置。</li>
<li>对于相对定位，盒的偏移位置由<code>top</code>,<code>right</code>,<code>bottom</code>,<code>left</code>决定，<code>及时有偏移，任然保留位置</code>，其他常规流中不能占用这个位置。</li>
</ul>
<h3 id="-">浮动</h3>
<ul>
<li>位于行的开头或结尾</li>
<li>导致常规流围绕在它的周边，除非清除浮动</li>
</ul>
<h3 id="-">绝对定位</h3>
<ul>
<li>绝对定位，盒从常规流中剔除，不影响常规流。</li>
<li>它的定位相对于它的包含块，有<code>top</code>,<code>right</code>,<code>bottom</code>,<code>left</code>等属性决定</li>
</ul>
<h2 id="-">块级格式化上下文</h2>
<p>到这里，已经对 CSS 的定位有一定的了解了，从上面的信息中也可以得知，块格式上下文是页面 CSS 视觉渲染的一部分，用于决定块盒子的布局及浮动相互影响范围的一个区域。</p>
<h3 id="bfc-">BFC 创建</h3>
<ul>
<li>根元素或其它包含它的元素</li>
<li>浮动元素</li>
<li>绝对定位元素</li>
<li>行内块<code>display: inline-block</code></li>
<li>表格单元</li>
<li><code>overflow</code>不为<code>visible</code></li>
<li>弹性盒子</li>
</ul>
<h3 id="bfc-">BFC 的范围</h3>
<ul>
<li>一个 BFC 包含创建该上下文元素的所有子元素，但不包括创建了新 BFC 的子元素的内部元素。这从另一方角度说明，一个元素不能同时存在于两个 BFC 中。</li>
</ul>
<h3 id="bfc-">BFC 的作用</h3>
<p>BFC 最显著的效果就是建立了一个隔离的空间，断绝空间内外元素间的相互作用。</p>
<ul>
<li>内部的盒子会在垂直方向一个接一个排列。</li>
<li>处于同一个 BFC 中的元素相互影响，可能会发生 margin 重叠</li>
<li>每个元素的 margin box 的左边，与容器块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；</li>
<li>BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然；</li>
<li>计算 BFC 的高度时，考虑 BFC 所包含的所有元素，连浮动元素也参与计算；</li>
<li>浮动盒区域不叠加到 BFC 上；</li>
</ul>
<h3 id="-">实际用例</h3>
<ol>
<li>案例一</li>
</ol>
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
      <span class="hljs-selector-class">.left</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#73de80</span>; <span class="hljs-comment">/* 绿色 */</span>
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#f31264</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">float</span>: left;
      }
      <span class="hljs-selector-class">.right</span> {
        <span class="hljs-comment">/* 粉色 */</span>
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ef5be2</span>;
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#f31264</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100px</span>;
      }
      <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#888</span>;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">50px</span>;
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
<p>绿色框（&#39;#left&#39;）向左浮动，它创建了一个新 BFC，但暂时不讨论它所创建的 BFC。由于绿色框浮动了，它脱离了原本 normal flow 的位置，因此，粉色框（&#39;#right&#39;）就被定位到灰色父元素的左上角（特性 3：元素左边与容器左边相接触），与浮动绿色框发生了重叠。<br>同时，由于灰色框（&#39;#box&#39;）并没有创建 BFC，因此在计算高度的时候，并没有考虑绿色框的区域（特性 6：浮动区域不叠加到 BFC 区域上），发生了高度坍塌，这也是常见问题之一。</p>
<ol start="2">
<li>案例二</li>
</ol>
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
      <span class="hljs-selector-class">.left</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#73de80</span>; <span class="hljs-comment">/* 绿色 */</span>
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#f31264</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">float</span>: left;
      }
      <span class="hljs-selector-class">.right</span> {
        <span class="hljs-comment">/* 粉色 */</span>
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ef5be2</span>;
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#f31264</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100px</span>;
      }
      <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#888</span>;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">50px</span>;
      }
      <span class="hljs-selector-class">.bfc</span> {
        <span class="hljs-attribute">overflow</span>: hidden;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box bfc"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>通过设置 overflow:hidden 来创建 BFC。所以灰色框创建了一个新的 BFC 后，高度发生了变化，计算高度时它将绿色框区域也考虑进去了（特性 5：计算 BFC 的高度时，浮动元素也参与计算）；</p>
<ol start="3">
<li>案例三</li>
</ol>
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
      <span class="hljs-selector-class">.left</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#73de80</span>; <span class="hljs-comment">/* 绿色 */</span>
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#f31264</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">float</span>: left;
      }
      <span class="hljs-selector-class">.right</span> {
        <span class="hljs-comment">/* 粉色 */</span>
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ef5be2</span>;
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#f31264</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100px</span>;
      }
      <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#888</span>;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">50px</span>;
      }
      <span class="hljs-selector-class">.bfc</span> {
        <span class="hljs-attribute">overflow</span>: hidden;
      }
      <span class="hljs-selector-class">.little</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">float</span>: left;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box bfc"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"little"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"little"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"little"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>由于粉色框没有创建新的 BFC，因此粉色框中白色块受到了绿色框的影响，被挤到了右边去了。先不管这个，看看白色块的 margin。</p>
<ol start="4">
<li>案例四</li>
</ol>
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
      <span class="hljs-selector-class">.left</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#73de80</span>; <span class="hljs-comment">/* 绿色 */</span>
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#f31264</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">float</span>: left;
      }
      <span class="hljs-selector-class">.right</span> {
        <span class="hljs-comment">/* 粉色 */</span>
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ef5be2</span>;
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#f31264</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100px</span>;
      }
      <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#888</span>;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">50px</span>;
      }
      <span class="hljs-selector-class">.bfc</span> {
        <span class="hljs-attribute">overflow</span>: hidden;
      }
      <span class="hljs-selector-class">.little</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">float</span>: left;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box bfc"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right bfc"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"little"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"little"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"little"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>一旦粉色框创建了新的 BFC 以后，粉色框就不与绿色浮动框发生重叠了，同时内部的白色块处于隔离的空间（特性 4：BFC 就是页面上的一个隔离的独立容器），白色块也不会受到绿色浮动框的挤压。利用 BFC 防止了 margin 的重叠</p>
`;
