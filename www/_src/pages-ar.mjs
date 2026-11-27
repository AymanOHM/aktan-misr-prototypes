// Arabic pages for Gulf / MENA / Morocco buyers. Draft translation: to be reviewed by a native trade writer.
// Trade terms chosen for search: فوط / بشاكير (towels), برانس (bathrobes).
import { real, fill, pageHead, newPage } from './lib.mjs';
import { quoteForm, heroMosaic, M1_SIZES } from './pages-en.mjs';

export function pages() {
  const out = [];
  {
    const p = newPage({ path: '/ar/', lang: 'ar', nav: '/ar/', title: 'مصنع فوط قطن مصري للعلامات الخاصة | أكتان مصر',
      description: 'مصنع فوط وبرانس من القطن المصري 100% في المحلة الكبرى منذ 1956. ننسج ونصبغ ونجهّز بعلامتك التجارية الخاصة للتصدير.',
      alternates: { en: '/' }, preload: ['robe-couple-sofa', M1_SIZES] });
    p.body = `
<section class="hero hero--mosaic" aria-labelledby="hero-h">
  <div class="container grid">
    <div class="hero__text">
      <h1 id="hero-h">مصنع فوط قطن مصري لعلامتك</h1>
      <p class="lead">فوط وبرانس تُنسج وتُصبغ وتُجهّز باسم علامتك منذ 1956.</p>
      <div class="hero__actions"><a class="btn btn--solid" href="/ar/quote/?buyer=private-label">اطلب عرض سعر</a><a class="link" href="/ar/private-label/">كيف تعمل العلامة الخاصة</a></div>
    </div>
    ${heroMosaic(['زوجان يرتديان برنسين مخططين بلون تركوازي على أريكة بيضاء', 'فوطة حمام تركوازية مطوية بشريط منقط منسوج', 'فوط فندقية بيضاء مطوية في كومة، عن قرب'])}
  </div>
</section>

<section id="mill" class="band" aria-labelledby="mill-h">
  <div class="container">
    <div class="head head--split"><h2 id="mill-h">مصنع واحد يتحكم في كل المراحل</h2><p class="lead">النسيج والصباغة والتجهيز والتغليف تحت سقف واحد في المحلة الكبرى.</p></div>
    <ol class="steps" style="--n: 4">
      <li><h3>النسيج</h3><p>تيري، قطيفة، وافل، دوبي وجاكار.</p></li>
      <li><h3>الصباغة</h3><p>صباغة الغزل أو القماش في مصبغتنا.</p></li>
      <li><h3>التجهيز</h3><p>قص وتقفيل وخياطة مزدوجة.</p></li>
      <li><h3>التغليف</h3><p>فحص وتعبئة للتصدير.</p></li>
    </ol>
  </div>
</section>

<section id="products" aria-labelledby="range-h">
  <div class="container">
    <div class="head head--split"><h2 id="range-h">ست عائلات منتجات</h2><p class="lead">كل منها بتصميمك ولونك وعلامتك.</p></div>
    <div class="families">
      <div>${real('bath-blue-jacquard', 'فوط حمام جاكار زرقاء معلقة على حامل ومطوية في كومة', { pos: '50% 60%' })}<h3>فوط حمام ووجه</h3><p>تيري، قطيفة، حواف جاكار</p></div>
      <div>${real('robe-woman-bed', 'امرأة ترتدي برنساً مربعات برتقالياً بقلنسوة جالسة على سرير', { pos: '50% 35%' })}<h3>برانس</h3><p>تيري، قطيفة، تيري جاكار</p></div>
      <div>${real('stock-hotel-jacquard', 'فوط فندقية بيضاء بحافة منسوجة مطوية في كومة', { pos: '50% 50%' })}<h3>فوط فنادق</h3><p>تيري بخياطة مزدوجة</p></div>
    </div>
    <p style="margin-top: var(--space-xl)">ومنها أيضاً فوط المطبخ وفوط الشاطئ والباريو. <a class="link" href="/products/" lang="en" hreflang="en">Products (English)</a></p>
  </div>
</section>`;
    out.push(p);
  }
  {
    const p = newPage({ path: '/ar/private-label/', lang: 'ar', nav: '/ar/private-label/', title: 'تصنيع فوط بعلامة خاصة من القطن المصري | أكتان مصر',
      description: 'تصنيع فوط وبرانس بعلامتك الخاصة من القطن المصري 100%: تصميمك ولونك وملصقك وتغليفك، من مصنع متكامل في مصر.',
      alternates: { en: '/private-label/' }, crumbs: [['الرئيسية', '/ar/'], ['العلامة الخاصة', '/ar/private-label/']] });
    p.body = `${pageHead('فوط قطن مصري بعلامتك الخاصة', 'فوط وبرانس حسب مواصفاتك، تُنسج وتُصبغ وتُعبأ في مصنعنا.', p.crumbs)}
<section class="s-s" aria-labelledby="how-h">
  <div class="container">
    <div class="head"><h2 id="how-h">كيف تعمل العلامة الخاصة</h2></div>
    <ol class="steps" style="--n: 3">
      <li><h3>المواصفات</h3><p>المنتج والمقاس والوزن واللون والكمية والسوق.</p></li>
      <li><h3>التصميم</h3><p>قسم التصميم يرسم شعارك لأنوال الجاكار.</p></li>
      <li><h3>العينة</h3><p>مطابقة درجة اللون في مصبغتنا؛ العينة خلال ${fill('مدة العينة')}.</p></li>
      <li><h3>الموافقة</h3><p>توافق على العينة واللون والملصق قبل الإنتاج.</p></li>
      <li><h3>الإنتاج</h3><p>في مصنع واحد؛ مدة الإنتاج ${fill('مدة الإنتاج')}.</p></li>
      <li><h3>التغليف والشحن</h3><p>ملصقاتك وأشرطتك وكراتينك، وشحن للتصدير.</p></li>
    </ol>
  </div>
</section>
<section aria-labelledby="spec-h">
  <div class="container split">
    <div>
      <h2 id="spec-h">ما يمكنك تحديده</h2>
      <dl class="ruled" style="margin-top: var(--space-xl)">
        <div><dt>المنتجات</dt><dd>فوط حمام ووجه، برانس، فوط مطبخ وشاطئ، باريو</dd></div>
        <div><dt>النسيج</dt><dd>تيري، قطيفة، وافل، سادة، دوبي، جاكار</dd></div>
        <div><dt>اللون</dt><dd>أبيض، أو مصبوغ حسب درجتك</dd></div>
        <div><dt>الحد الأدنى للطلب</dt><dd>${fill('الحد الأدنى لكل تصميم ولون')}</dd></div>
      </dl>
      <div class="actions"><a class="btn btn--solid" href="/ar/quote/?buyer=private-label">اطلب عرض سعر</a></div>
    </div>
    ${real('kitchen-orange-chef', 'فوطتا مطبخ جاكار برتقاليتان بزخرفة طاهٍ منسوجة معلقتان على مشابك', { pos: '50% 40%', tint: true })}
  </div>
</section>`;
    out.push(p);
  }
  {
    const p = newPage({ path: '/ar/quote/', lang: 'ar', nav: '/ar/quote/', title: 'اطلب عرض سعر | أكتان مصر', description: 'حدد مواصفات الفوط أو البرانس من القطن المصري وأرسلها إلى قسم التصدير.',
      alternates: { en: '/quote/' }, crumbs: [['الرئيسية', '/ar/'], ['اطلب عرض سعر', '/ar/quote/']] });
    p.body = `${pageHead('اطلب عرض سعر', 'اختر ما تحتاجه وستمتلئ المواصفات تلقائياً. يرد قسم التصدير بالبريد الإلكتروني.', p.crumbs)}
<section class="s-s" aria-label="طلب عرض سعر"><div class="container quote">${quoteForm('ar')}</div></section>`;
    out.push(p);
  }
  return out;
}
