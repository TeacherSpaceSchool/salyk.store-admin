import Head from 'next/head';
import React from 'react';
import App from '../layouts/App';
import contactStyle from '../src/styleMUI/contact'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { urlMain } from '../redux/constants/other'
import initialApp from '../src/initialApp'

const Ofert = React.memo(() => {
    const classes = contactStyle();
    return (
        <App pageName='Публичная оферта'>
            <Head>
                <title>Публичная оферта</title>
                <meta name='description' content='SuperKassa(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content='Публичная оферта' />
                <meta property='og:description' content='SuperKassa(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/ofert`} />
                <link rel='canonical' href={`${urlMain}/ofert`}/>
            </Head>
            <Card className={classes.page}>
                <CardContent>
                    <center><h2>ПУБЛИЧНАЯ ОФЕРТА</h2></center>
                    <p>Настоящий договор (далее &ndash; Договор) является публичной офертой, в соответствии с которой ОсОО &laquo;АрхиКойн&raquo;, в лице директора Нурмукамбетов Бактыбек Эмилбекович, действующей на основании Устава, предлагает заключить настоящий Договор на указанных в нем условиях.</p>
                    <p>Производя регистрацию на настоящем сайте (https://www.superkassa.kg), Лицензиат гарантирует, что ознакомлен, соглашается, полностью и безоговорочно принимает условия настоящего Договора.</p>
                    <p>Регистрируясь на настоящем сайте (https://www.superkassa.kg), Лицензиат подтверждает свои права и дееспособность, а также что он имеет законные права вступать в договорные отношения с ОсОО &laquo;АрхиКойн&raquo;</p>
                    <p><strong>Примечание:</strong> <strong>регистрация на сайте считается завершенной, а Договор &ndash; заключенным, </strong>после осуществления нижеследующих действий:</p>
                    <p>Введения лицом, осуществляющим регистрацию, данных индивидуального предпринимателя (если регистрация осуществляется от имени индивидуального предпринимателя) либо данных юридического лица (если регистрация осуществляется от имени юридического лица), являющихся обязательными для заполнения <em>(БИН или ИИН, номер телефона, наименование организации).</em></p>
                    <ol>
                        <li><b>ТЕРМИНЫ И ОПРЕДЕЛЕНИЯ</b></li>
                    </ol>
                    <p>1.1. Лицензиар &ndash; ОсОО &laquo;АрхиКойн&raquo;.</p>
                    <p>1.2. Лицензиат &ndash; индивидуальный предприниматель или юридическое лицо, осуществившее регистрацию на сайте (https://www.superkassa.kg).</p>
                    <p>1.3. Стороны &ndash; стороны Договора (одновременное указание и на Лицензиара, и на Лицензиата).</p>
                    <p>1.4. Сайт &ndash; https://www.superkassa.kg</p>
                    <p>1.5. Продукт &ndash; программно контрольно-кассовая машина с функцией передачи данных &laquo;ККМ SuperKassa&raquo; версии 1.0, внесенная в государственный реестр контрольно-кассовых машин исключительные имущественные права на которое принадлежат Лицензиару.</p>
                    <p>1.6. Личный кабинет &ndash; учетная запись Лицензиата, доступ к которой предоставляется Лицензиаром Лицензиату после регистрации на Сайте.</p>
                    <p>1.7. &laquo;Логин&raquo; и/или &laquo;Пароль&raquo; &ndash; уникальные наборы символов (цифры, буквы, знаки), необходимые для входа в Личный кабинет. Номер телефона Лицензиата, указываемый во время регистрации на Сайте, также является Логином.</p>
                    <ol start='2'>
                        <li><b>ПРЕДМЕТ ДОГОВОРА</b></li>
                    </ol>
                    <p>2.1. Лицензиар обязуется предоставить Лицензиату право использования Продукта на условиях и в пределах, предусмотренных пунктом 2.3 настоящего Договора, а Лицензиат за предоставление этих прав уплачивает Лицензиару вознаграждение в порядке и размерах, установленных настоящим Договором.</p>
                    <p>2.2. Право использования Продукта по настоящему Договору предоставляется Лицензиату на условиях простой, неисключительной лицензии, при которой за Лицензиаром сохраняются возможность его использования и права выдачи лицензии другим лицам.</p>
                    <p>2.3. По настоящему Договору Лицензиар предоставляет Лицензиату право на использование Продукта следующими способами:</p>
                    <p>2.3.1. воспроизведение Продукта (инсталляция Продукта на совместимое с Продуктом техническое устройство, запуск Продукта и пользование его функциональными возможностями).</p>
                    <p>2.4. Лицензиат не имеет права передавать Продукт и/или права на его использование, полученные по Договору, третьим лицам по сублицензионным договорам.</p>
                    <p>2.5. Права на использование Продукта, указанные в пункте 2.3 Договора, передаются Лицензиаром Лицензиату для использования Продукта на территории Кыргызской республики</p>
                    <p>2.6. Лицензиар, на условиях настоящего Договора, предоставляет Лицензиату доступ к Личному кабинету (с его функциональными возможностями).</p>
                    <ol start='3'>
                        <li><b>ПРАВА И ОБЯЗАННОСТИ СТОРОН</b></li>
                    </ol>
                    <p>3.1. Лицензиат обязан:</p>
                    <p>3.1.1. осуществлять оплату на условиях, предусмотренных настоящим Договором;</p>
                    <p>3.1.2. незамедлительно изменить свой Пароль для доступа к Личному кабинету, если Пароль для доступа к Личному кабинету Лицензиата стал известен другим лицам, помимо Лицензиата;</p>
                    <p>3.1.3. при осуществлении регистрации и/или подаче заявки на изменение данных, подаваемой Лицензиатом в соответствии с пунктом 4.1.3 Договора, указать достоверные данные индивидуального предпринимателя (если Лицензиат является индивидуальным предпринимателем) либо данные юридического лица (если Лицензиат является юридическим лицом);</p>
                    <p>3.1.4. самостоятельно следить за своевременным получением счетов на оплату, электронных счетов-фактур, актов выполненных работ (оказанных услуг) и иных документов от Лицензиара;</p>
                    <p>3.2. Лицензиат имеет право:</p>
                    <p>3.2.1. запрашивать у Лицензиара информацию, касающуюся Продукта (целевое назначение Продукта, качественные характеристики Продукта и т.д.);</p>
                    <p>3.2.2. пользоваться функциональными возможностями Личного кабинета;</p>
                    <p>3.2.3. отказаться от исполнения Договора, уведомив об этом Лицензиара не менее чем за 30 (тридцать) календарных дней;</p>
                    <p>3.3. Лицензиар обязан:</p>
                    <p>3.3.1. предоставить Лицензиату доступ в Личный кабинет с правом пользования его функциональными возможностями;</p>
                    <p>3.3.2. предоставить Лицензиату информацию, касающуюся Продукта (целевое назначение Продукта, качественные характеристики Продукта и т.д.);</p>
                    <p>3.3.3. обеспечить круглосуточную работу Сайта, Личного кабинета и Продукта, за исключением перерывов для проведения необходимых профилактических и ремонтных работ.</p>
                    <p>3.4. Лицензиар имеет право:</p>
                    <p>3.4.1. требовать от Лицензиата надлежащего исполнения условий настоящего Договора;</p>
                    <p>3.4.2. отказать Лицензиату в одобрении заявки на изменение данных, поданной Лицензиатом в соответствии с пунктом 4.1.3 Договора, предоставив Лицензиату мотивированное объяснение отказа;</p>
                    <p>3.4.3. направлять Лицензиату сообщения рекламно-информационного характера, если Лицензиат не отказался от их получения в соответствии с пунктом 3.2.6 Договора;</p>
                    <p>3.4.4. временно приостановить работу Сайта, Личного кабинета и/или Продукта по техническим или иным причинам, на время устранения таких причин;</p>
                    <p>3.4.5. в одностороннем порядке изменять цены на услуги генерации Активационных ключей. При этом цены на ранее приобретенные Лицензиатом услуги не подлежат изменению;</p>
                    <p>3.4.6. заблокировать доступ Лицензиата к функциональным возможностям Продукта на всех технических устройствах, на которых Лицензиатом используется Продукт, в случае, предусмотренном пунктом 5.12 Договора.</p>
                    <ol start='5'>
                        <li><b>ПОРЯДОК РАСЧЕТОВ И ПРИНЯТИЯ ОКАЗАННЫХ УСЛУГ</b></li>
                    </ol>
                    <p>1.1. Стоимость одной услуги указывается в сомах, отражается на Сайте и в Личном кабинете и действительна на момент его приобретения.</p>
                    <p>1.2. Датой осуществления платежа считается дата зачисления денежных средств</p>
                    <ol start='6'>
                        <li><b>ПОРЯДОК ИЗМЕНЕНИЯ И РАСТОРЖЕНИЯ ДОГОВОРА</b></li>
                    </ol>
                    <p>ПОСЛЕДСТВИЯ ПРЕКРАЩЕНИЯ ДОГОВОРА</p>
                    <p>1.1. Настоящий Договор может быть расторгнут соглашением Сторон, а также в иных случаях, установленных законодательством Кыргызской Республики</p>
                    <p>1.2. В случае прекращения настоящего Договора по любым основаниям, предусмотренным действующим законодательством Кыргызской Республики либо настоящим Договором, Лицензиар лишает Лицензиата доступа к функциональным возможностям Личного кабинета</p>
                    <ol start='7'>
                        <li><b>ОТВЕТСТВЕННОСТЬ СТОРОН</b></li>
                    </ol>
                    <p>7.1. За ненадлежащее исполнение и/или неисполнение обязательств по настоящему Договору Стороны несут ответственность в соответствии с действующим законодательством Кыргызской Республики.</p>
                    <p>7.2. Стороны освобождаются от ответственности за неисполнение и/или ненадлежащее исполнение обязательств по Договору при возникновении непреодолимых препятствий, под которыми понимаются стихийные бедствия, массовые беспорядки, запретительные действия властей и иные форс-мажорные обстоятельства.</p>
                    <p>7.3. Лицензиар не несет ответственности за:</p>
                    <p>7.3.1. точность и верность введенных Лицензиатом данных индивидуального предпринимателя (если регистрация осуществляется/осуществлялась от имени индивидуального предпринимателя) либо данных юридического лица (если регистрация осуществляется/осуществлялась от имени юридического лица);</p>
                    <p>7.3.2. точность и верность указанных Лицензиатом и отраженных в Личном кабинете банковских реквизитов Лицензиата;</p>
                    <p>7.3.3. корректность и работоспособность платежных систем, банков, терминалов оплаты;</p>
                    <p>7.3.4. неознакомление Лицензиата с изменениями, внесенными Лицензиаром в условия настоящего Договора в соответствии с пунктом 6.1 Договора.</p>
                    <p>7.4. Лицензиар не несет ответственности за убытки, которые Лицензиат может понести в результате того, что его Логин и Пароль от Личного кабинета стали известны третьему лицу. Настоящий пункт не применяется в случае, если Логин и Пароль Лицензиата от Личного кабинета стали известны третьему лицу по вине Лицензиара.</p>
                    <ol start='8'>
                        <li><b>ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ</b></li>
                    </ol>
                    <p>8.1. Споры Сторон, связанные с исполнением, изменением и расторжением настоящего Договора, регулируются путем переговоров, обмена письмами (претензиями). Срок для рассмотрения письма (претензии) для каждой из Сторон составляет 10 (десять) календарных дней с момента его получения.</p>
                    <p>8.2. В случае если Стороны не достигнут соглашения между собой, местом судопроизводства будет являться уполномоченный суд по месту нахождения Лицензиара.</p>
                    <ol start='9'>
                        <li><b>УСЛОВИЯ КОНФИДЕНЦИАЛЬНОСТИ</b></li>
                    </ol>
                    <p>9.1. Стороны гарантируют неразглашение третьим лицам любой информации, ставшей им известной в ходе исполнения настоящего Договора, а также из полученных от другой Стороны документов, за исключением случаев, когда такая информация должна быть предоставлена:</p>
                    <p>9.1.1. уполномоченным государственным органам в соответствии с надлежащим образом оформленным запросом;</p>
                    <p>9.1.2. аудиторам и иным консультантам (в том числе, юридическим) соответствующей Стороны и при условии получения письменного обязательства об обеспечении конфиденциальности передаваемой информации такими лицами;</p>
                    <p>9.1.3. работникам и третьим лицам соответствующей Стороны, действующим на основании договора с этой Стороной, для исполнения обязательств перед другой Стороной Договора.</p>
                    <p>9.2. При регистрации и последующей работе на Сайте Лицензиат предоставляет Лицензиару свои личные данные (номер телефона), данные индивидуального предпринимателя (если регистрация осуществляется/осуществлялась от имени индивидуального предпринимателя) либо данные юридического лица (если регистрация осуществляется/осуществлялась от имени юридического лица).</p>
                    <p>9.3. Предоставляя свои личные данные либо данные индивидуального предпринимателя или юридического лица, Лицензиат дает согласие на их сбор, обработку, хранение и использование Лицензиаром.</p>
                    <p>9.4. Лицензиар использует информацию, предоставленную Лицензиатом:</p>
                    <p>9.4.1. для регистрации Лицензиата на Сайте;</p>
                    <p>9.4.2. для выполнения своих обязательств перед Лицензиатом.</p>
                    <p>9.5. Лицензиар вправе использовать технологию &laquo;cookies&raquo;. &laquo;Cookies&raquo; не содержат конфиденциальную информацию и не передаются третьим лицам.</p>
                    <ol start='10'>
                        <li><b>ПОРЯДОК ОБМЕНА ПИСЬМАМИ</b></li>
                    </ol>
                    <p>10.1. Для целей настоящего Договора обмен любыми письмами, уведомлениями, претензиями и т.п. осуществляется Сторонами в Личном кабинете.</p>
                    <ol start='11'>
                        <li><b>ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</b></li>
                    </ol>
                    <p>11.1. Настоящий Договор вступает в силу с момента его заключения (завершения регистрации Лицензиата).</p>
                    <p>11.2. Прекращение Договора не освобождает Стороны от ответственности за его нарушение, имевшее место до прекращения Договора.</p>
                    <p>11.3. Лицензиар вправе уступить, иным образом передать свои права и обязательства по настоящему Договору третьему лицу без согласия Лицензиата.</p>
                    <p>11.4. Лицензиат соглашается с тем, что все действия, произведенные от его имени (с использованием Личного кабинета Лицензиата), расцениваются как действия этого Лицензиата.</p>
                    <p>11.5. Электронные образы (сканированные варианты) оригиналов документов, подписанные и заверенные печатью (при ее наличии), переданные соответствующей Стороной другой Стороне, имеют силу и обязательны для исполнения Сторонами до обмена самими оригиналами.</p>
                    <p>11.6. Во всем остальном, что не предусмотрено положениями настоящего Договора, Стороны обязуются руководствоваться действующим законодательством Кыргызской Республики.</p>
                    <ol start='12'>
                        <li><b>РЕКВИЗИТЫ ЛИЦЕНЗИАРА</b></li>
                    </ol>
                    <p>ОсОО &laquo;АрхиКойн&raquo;</p>
                    <p>Адрес: Кыргызская Республика, г. Бишкек, Ленинский район ул. Лущихина, дом 99в</p>
                    <p>ИНН: 00103201810134</p>
                    <p>Контактный телефон Агента: +996&nbsp;554 77 66 67</p>
                    <p>Электронный адрес службы поддержки пользователей: superkassa.kgz@gmail.com</p>
                </CardContent>
            </Card>
        </App>
    )
})

Ofert.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    return {};
};

export default Ofert