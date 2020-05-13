let oPat = JSON.parse(localStorage.getItem('Patient'));
localStorage.removeItem('Patient')
console.log(oPat);

function creatMirrorRF() {
    let vIsShow = false,
        vCardCounter = 0,
        aLi = [];

    const createCard = (cls, val, title, ind, content, id) => {
        vCardCounter++;
        $('#accListRF').append(`<div class="card  ${cls}"><div class="card-header" id="divCHeader_${ind}"><h5 class="mb-0"><button type="button"  class="btn btn-block" id="${id}" value="${val}" data-toggle="collapse" data-target="#collapse_${ind}" aria-controls="collapse_${ind}">${title}</button></h5></div>
        <div id="collapse_${ind}" class="collapse ${vIsShow ? '': 'show'}" aria-labelledby="divCHeader_${ind}" data-parent="#accListRF"><div class="card-body"><ul class="list-group list-group-flush">${content}</ul></div></div></div>`);
        vIsShow = true;
    }
    const creatReference = cmt => cmt ? `<span class="preReference"> &hellip;</span><span class="reference"> ${cmt}</span>` : '';

    const creatTitle = (ttl, cmt) => `${ttl}${creatReference(cmt)}`;

    const createLi = (cls, id, vle, ttl, cmt) => ($(`<li class="list-group-item ${cls}" id="${id}" data-value="${vle}">${creatTitle(ttl, cmt)}</li>`).prop('outerHTML'));

    const createBtn = ((cls, id, vle, ttl, cmt) => $('#accListRF').append($(`<button type="button"  class="btn btn-block btnSingleRF ${cls}" id="${id}" value="${vle}">${creatTitle(ttl, cmt)}</button>`).prop('outerHTML')));

    // High Blood Pressure
    aLi.push(createLi('cls2RF', 'liSystHypert1th', '1000000000000000', ' артериальная гипертензия 1 степени', ', CАД 140-159 или ДАД 90-99 мм рт. ст.'));

    aLi.push(createLi('cls2BRF liSystHypert_1', 'liSystHypert2th', '1000000000000000', ' артериальная гипертензия 2 степени', ', САД 160-179 или ДАД 100-109 мм рт. ст.'));

    aLi.push(createLi('cls2BRF liSystHypert_1', 'liSystHypert3th', '1000000000000000', ' артериальная гипертензия 3 степени', ', САД &ge; 180 или АД &ge; 110 мм рт. ст.'));

    aLi.push(createLi('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF_1 cls4BRF liSystHypert_1', 'liUncontrolSystHypert', '1000000001000100', ' неконтролируемая артериальная гипертензия', ', артериальное давление &ge; 200 мм рт.ст. систолическое или &ge; 120 мм рт.ст. диастолическое'));

    createCard('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF_1 cls4BRF clsOneChoice', '1000010000000000', 'артериальная гипертензия', vCardCounter, aLi.join(''));
    aLi = [];

    // Diabetes mellitus
    aLi.push(createLi('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF_1 cls4BRF  clsObstComorbidities', '', '1000000000000000', '<span> сахарный диабет</span> I типа с нефропатией', ''));

    aLi.push(createLi('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF_1 cls4BRF', '', '1000000000000000', '<span> сахарный диабет</span> II типа', ''));

    createCard('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF_1 cls4BRF clsOneChoice', '100001000000000', 'сахарный диабет', vCardCounter, aLi.join(''), 'ulIsDiabetes');
    aLi = [];

    // Acute Infection

    aLi.push(createLi('cls3RF', 'liAcuteInflamDisease', '10000000000000000', ' острое воспалительное заболевание', ''));

    aLi.push(createLi('cls3RF', 'liSepsis', '1000000310000000', ' сепсис (&lt; 1 мес.)', ''));

    aLi.push(createLi('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF', '', '1000000000000000', ' септический эндокардит', ''));

    aLi.push(createLi('cls1RF cls3RF liSumTherRF_2', '', '1000000000000000', ' острая инфекция', ''));

    createCard('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF', '1000000000001000', 'острое воспалительное заболевание или инфекция', vCardCounter, aLi.join(''), 'ulIsAcuteInflamDiseaseOrInf');
    aLi = [];

    // Therm trauma

    aLi.push(createLi('cls8RF liBurnsSuperficial_1 liBurns_1', '', '1000000000020000', ' ожоги поверхностные, площадью &lt; 20% поверхности тела', ''));

    aLi.push(createLi('cls8RF liBurnsSuperficial_1 liBurns_2', '', '1000000000030000', '<span><span hidden>ожоги поверхностные, площадью</span> &gt; 20% поверхности тела</span>', ''));

    aLi.push(createLi('cls8RF liBurnsDeep_1 liBurns_1', '', '1000000000020000', '  ожоги глубокие, площадью &lt; 10% поверхности тела', ''));

    aLi.push(createLi('cls8RF liBurnsDeep_1 liBurns_1', '', '1000000000030000', ' ожоги глубокие, площадью от 10% до 20% поверхности тела', ''));

    aLi.push(createLi('cls8RF liBurnsDeep_1 liBurns_2', '', '1000000000030000', ' ожоги глубокие, площадью &gt; 20% поверхности тела', ''));

    aLi.push(createLi('cls3RF cls8RF liThermalInhalationInjury_1', '', '100000020000000', ' термоингаляционная травма II степени', ''));

    aLi.push(createLi('cls8RF liThermalInhalationInjury_1', '', '1000000300000000', ' термоингаляционная травма III степени', ''));

    aLi.push(createLi('cls8RF', '', '1000000000030000', ' отморожение II–IV степени', ''));

    aLi.push(createLi('cls8RF cls3RF', '', '1000000300000000', ' осложнения ожоговой болезни', ': шок, острая токсемия и септикотоксемия'));

    createCard('cls8RF', '1000000000000000', 'термическая травма', vCardCounter, aLi.join(''));
    aLi = [];

    // Onco

    aLi.push(createLi('cls3RF cls9RF', '', '1000000000000000', ' злокачественное новообразование в анамнезе', ''));

    aLi.push(createLi('cls1RF cls3RF cls9RF liNeoplasm_1', 'liActiveNeoplasm', '1000000100000000', ' активное злокачественное новообразование', ': имеются локальные или отдаленные метастазы и/или химиотерапия/радиотерапия &lt; 6 мес назад'));

    aLi.push(createLi('cls1RF cls3RF cls9RF liNeoplasm_1 liNeoplasm_2', '', '1100000000000000', ' гормонотерапия у онкологических пациентов', ''));

    aLi.push(createLi('cls1RF cls3RF cls9RF liNeoplasm_1 liNeoplasm_2', '', '1000000000000000', ' химиотерапия, рентгенотерапия у онкологических пациентов', ''));

    createCard('cls9RF clsObstComorbidities', '1000000020000000', 'злокачественное новообразование', vCardCounter, aLi.join(''));
    aLi = [];

    // Rheumo

    aLi.push(createLi('cls1BRF', 'liRheumDiseases', '1000000000000000', '  ревматологическое заболевание', ''));

    aLi.push(createLi('cls1RF liSumTherRF_2 clsObstComorbidities', 'liAcuteRheumDiseases', '1000000000000000', ' острое ревматологическое заболевание', ': активная системная красная волчанка, воспалительная полиартропатия'));

    createCard('cls1RF clsObstComorbidities clsOneChoice', '102.000000000000', 'ревматологическое заболевание', vCardCounter, aLi.join(''));
    aLi = [];

    // Lung Disease

    aLi.push(createLi('cls3RF liLungDiseases_1', 'liSevereLungDiseases', '1000000300000000', '<span hidden> тяжелые заболевания легких</span> на ИВЛ', ': с выраженной дыхательной недостаточностью, требующие искусственной вентиляцией легких'));

    aLi.push(createLi('cls3RF liLungDiseases_1', 'liModerateLungDiseases', '1000000200000000', '<span hidden> заболевания легких</span> без ИВЛ', ', в том числе пневмония, с дыхательной недостаточностью, не требующие искусственной вентиляции'));

    aLi.push(createLi('cls3RF', '', '1000000010000000', '<span hidden>заболевания легких длительностью</span> &lt; 1 мес.', ''));

    aLi.push(createLi('cls3RF', '', '1000000010000000', ' ХОБЛ', ' (хроническая обструктивная болезнь легких)'));

    createCard('cls3RF', '1000000100000000', 'заболевания легких с дыхательной недостаточностью', vCardCounter, aLi.join(''), 'ulIsPulmInsuff');
    aLi = [];

    // Anemia

    aLi.push(createLi('cls9RF', 'liHbLess_100', '1000000100000000', ' Hb &lt; 100 г/л'));

    aLi.push(createLi('cls10RF clsObstComorbidities', '', '1000000000000000', ' серповидноклеточная анемия'));

    createCard('cls9RF cls10RF', '1000000000000000', 'анемия', vCardCounter, aLi.join(''));
    aLi = [];

    // Thrombophilia

    aLi.push(createLi('cls1RF cls3RF liHighRiskThrombophilia_1', '', '1000000030000000', ' полиморфизм фактора Лейдена', ' (V фактора свертывания крови)'));

    aLi.push(createLi('cls1RF cls3RF liHighRiskThrombophilia_1', '', '1000000030000000', ' полиморфизм протромбина G20210A'));

    aLi.push(createLi('cls3RF liHighRiskThrombophilia_1', '', '1000000030000000', ' гипергомоцистеинемия'));

    aLi.push(createLi('cls1RF cls3RF liHighRiskThrombophilia_1', '', '1000000030000000', ' повышенный уровень антител к кардиолипину', ' (антифосфолипидный синдром)'));


    aLi.push(createLi('cls1RF cls3RF liHighRiskThrombophilia_1', '', '1000000030000000', ' наличие волчаночного антикоагулянта', ' (антифосфолипидный синдром)'));

    aLi.push(createLi('cls1RF cls3RF liHighRiskThrombophilia_1', '', '1000000030000000', ' другая врожденная или приобретенная тромбофилия', ' (дефекты антитромбина, протеина С или S и др.)'));

    aLi.push(createLi('cls10RF', '', '1000000000001000', ' известная тромбофилия низкого риска (без ВТЭО)'));

    createCard('cls1RF cls3RF', '1000000000000000', 'тромбофилия ', vCardCounter, aLi.join(''));
    aLi = [];

    // Hypercoagulation

    aLi.push(createLi('cls9RF', '', '1000000100000000', ' тромбоциты &gt; 350 × 10 <sup><small>9</small></sup>/л'));

    aLi.push(createLi('cls9RF', '', '1000000100000000', ' фибриноген &gt; 400 мг/мл'));

    aLi.push(createLi('cls9RF', '', '1000000100000000', ' Д-димер &gt; 0,5 мкг/мл'));

    createCard('cls9RF', '1000000000000000', 'гиперкоагуляция ', vCardCounter, aLi.join(''));
    aLi = [];

    // Hemorragic Syndrome

    aLi.push(createLi('cls2BRF cls10BRF liСoagulopathy_1', '', '1000000000000000', ' геморрагические генетические коагулопатии', ' . Наиболее часто встречаются гемофилия и болезнь Виллебранда. Более редкие генетические нарушения включают гемофилию С, гипопроконвертинемию и ряд других аномалий.'));

    aLi.push(createLi('cls2BRF cls10BRF liСoagulopathy_1', '', '1000000000000000', ' геморрагические аутоиммунные коагулопатии', ' обусловлены появлением антител (ингибиторов свертывания) к факторам свёртывания крови или фосфолипидам. Наиболее часто встречается коагулопатия иммунного генеза на фоне Антифосфолипидного синдрома. Дефицит факторов свертывания в результате аутоиммунных реакций иногда происходит у пациентов после частых переливаний крови.'));

    aLi.push(createLi('cls2BRF cls3BRF_1 cls4BRF cls10BRF liСoagulopathy_1', '', '1000000000000000', ' геморрагические приобретенные коагулопатии', ', могут быть обусловлены нарушением функции печени, применением разных антикоагулянтов, антиагрегантов или тромболитических препаратов, недостаточностью всасывания витамина «К» и повышенным потреблением компонентов системы свёртывания крови на фоне ДВС-синдрома. Поражение факторов свертываемости может быть в результате преждевременной отслойки плаценты, эмболии околоплодными водами и рака простаты. Коагулопатию вызывают некоторые виды гемотоксичных змеиных ядов, некоторые виды вирусных геморрагических лихорадок, иногда - лейкемия.'));

    aLi.push(createLi('cls2BRF cls10BRF liСoagulopathy_1', '', '1000000000000000', ' геморрагические вазопатии', '- заболевания, обусловленные патологией сосудов. Типичные заболевания этой группы — болезнь Рандю–Ослера, пурпура Шёнляйна–Геноха, первичные геморрагические васкулиты.'));

    aLi.push(createLi('cls2BRF cls10BRF liThrombocytopenia_1 liThrombocytopenia_2', 'liPlateletsLess150', '1000000000000000', ' тромбоциты в крови &lt; 150 х 10<sup><small>9</small></sup>/л', ' (тромбоцитопения)'));

    aLi.push(createLi('cls3BRF_1 cls10BRF liThrombocytopenia_1 liThrombocytopenia_2', 'liPlateletsLess75', '1000000000000100', ' тромбоциты в крови &lt; 75 х 10<sup><small>9</small></sup>/л'));

    aLi.push(createLi('cls3BRF_1 cls10BRF liThrombocytopenia_1  liThrombocytopenia_2', 'liPlateletsLess50', '104.000000000100', ' тромбоциты в крови &lt; 50 х 10<sup><small>9</small></sup>/л'));

    aLi.push(createLi('cls3RF liThrombocytopenia_1', '', '1000000030000000', ' гепарин-индуцированная тромбоцитопения'));

    aLi.push(createLi('cls3BRF_1', '', '1000000001000000', ' нелеченная коагулопатия', '. Любая из коагулопатий без эффективной медикаментозной коррекции.'));

    createCard('cls2BRF cls3RF cls3BRF_1 cls4BRF cls10BRF', '1000000000000000', 'геморраг. гемостазиопатии (геморраг. диатез, геморраг. с-м) ', vCardCounter, aLi.join(''), 'ulIsHemorrSyndrome');
    aLi = [];

    // VTE

    aLi.push(createLi('cls1RF cls2RF cls3RF liSumAtrFibrRF_1 liThromboemb_1', 'liWasPulmEmb', '1000000000000000', ' эпизод ВТЭО в анамнезе', ' (за исключением тромбоза поверхностных вен)'));

    aLi.push(createLi('cls10RF liThromboemb_1 liThromboemb_2', '', '1000000000004030', ' предшествующие рецидивирующие ВТЭО'));

    aLi.push(createLi('cls10RF liThromboemb_1 liThromboemb_2', '', '1000000000000030', ' предшествующие ВТЭО, ничем не спровоцированные или связанные с приемом эстрогенов'));

    aLi.push(createLi('cls2RF cls3RF cls10RF liThromboemb_1 liThromboemb_2 liProvocedVTE_1', '', '1000000000004000', ' предшествующие спровоцированные ВТЭО', ' кроме единичного эпизода, связанного с большим хирургическим вмешательством'));

    aLi.push(createLi('cls2RF cls3RF cls10RF liThromboemb_1 liThromboemb_2 liProvocedVTE_1', '', '1000000000003000', ' предшествующие ВТЭО спровоцированные большим хирургическим вмешательством'));

    aLi.push(createLi('cls10RF liThromboemb_3', '', '10000000000000003', ' тромбоэмболия в семейном анамнезе'));

    createCard('cls3RF cls10RF', '1000000000000000', 'ВТЭО в анамнезе ', vCardCounter, aLi.join(''));
    aLi = [];

    // Restricted Mobility

    aLi.push(createLi('cls3RF', '', '1000000010000000', ' постельный режим'));

    aLi.push(createLi('cls1RF cls3RF cls10R', 'liBedRestMore3Days', '1000000120000000', ' строгий постельный режим', ' (без посещения туалетной комнаты) &gt; 72 часов'));

    aLi.push(createLi('cls3RF', '', '1000000020000000', ' гипсовая иммобилизация конечности', ' (давностью до 1 мес.)'));

    aLi.push(createLi('cls3RF', 'liPlegia', '1000000020000000', ' паралич или глубокий парез', ' (тетра- геми- или нижний грубый монопарез/плегия)'));

    aLi.push(createLi('cls3RF', '', '10000001000000000', ' длительное положение сидя', ' (например длительный перелет в эконом-классе или поездка на транспорте сидя)'));

    createCard('cls1RF cls3RF cls10RF', '1300000000000010', 'ограниченная подвижность ', vCardCounter, aLi.join(''), 'ulIsRestrictedMobility');
    aLi = [];

    // Is Trauma

    aLi.push(createLi('cls3RF liTraum_1', '', '1000000000030000', ' перелом костей таза', ' (давностью до 1 мес.)'));

    aLi.push(createLi('cls3RF liTraum_1', '', '1000000000030000', ' перелом бедра', ' (давностью до 1 мес.)'));

    aLi.push(createLi('cls3RF  cls4RF liTraum_1', '', '1000000200000000', ' изолированные переломы голени', ' (давностью до 1 мес.)'));

    aLi.push(createLi('cls3RF  cls4RF', '', '10000002000000005', ' повреждения связочного аппарата и сухожилий голени', ', требующие иммобилизации голеностопного сустава'));

    aLi.push(createLi('cls3RF  cls4RF cls5RF', 'liSpinalCordInjure', '1000000000000000', ' повреждение спинного мозга'));

    aLi.push(createLi('cls3RF  cls4RF', '', '1000000350000000', ' множественная и сочетанная травма'));

    createCard('cls4RF cls5RF', '1000000000000000', 'есть травма &lt; 1 месяца назад ', vCardCounter, aLi.join(''), 'ulIsTraum');
    aLi = [];

    // Birth

    aLi.push(createLi('clsLabourRF', '', '1000000000001000', ' преждевременные роды', ' (37 недель при текущей беременности)'));

    aLi.push(createLi('clsLabourRF', '', '1000000000001010', ' многоплодная беременность'));

    aLi.push(createLi('clsLabourRF', '', '1000000000001010', ' послеродовое кровотечение', ' требующее &gt; 1 литра трансфузии'));

    aLi.push(createLi('clsLabourRF', '', '1000000000001010', ' затяжные роды', ' (>24 часов)'));

    aLi.push(createLi('clsLabourRF', '', '1000000000001010', ' полостные или ротационные щипцы'));

    aLi.push(createLi('clsLabourRF', '', '1000000000001000', ' ВРТ, ЭКО', ' (ART - вспомогательные репродуктивные технологии, IVF - экстракорпоральное оплодотворение)'));

    aLi.push(createLi('clsLabourRF', '', '1000000000001010', ' преэклампсия'));

    aLi.push(createLi('clsLabourRF liLabourRuRF_1', 'liSeverePreeclampsia', '1000000000000000', ' тяжелая форма преэклампсии'));

    aLi.push(createLi('clsLabourRF liLabourRuRF_1', 'liStillbirth', '1000000000001000', ' мертворождение при текущей беременности'));

    createCard('clsLabourRF', '1000000000000000', 'особенности данных родов ', vCardCounter, aLi.join(''));
    aLi = [];

    // Chronic Heart Insuff 

    aLi.push(createLi('cls1RF cls2RF', 'liSomeHeartInsuff', '1000000000000000', '<span hidden> хроническая сердечная недостаточность</span> любой стадии'));

    aLi.push(createLi('cls3RF', 'liHeartInsuffLess1Month', '1000000000000000', '<span hidden> сердечная недостаточность любой стадии</span> &lt; 1 мес.'));

    aLi.push(createLi('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF_1 cls4BRF', 'liHeartInsuff3_4', '10000002000000000', ' хроническая сердечная недостаточность III—IV ФК по NYHA'));

    aLi.push(createLi('cls3RF', 'liCongestHeartFailOrSystLVDysfunctEFLess40Percent', '10000000000000001', ' застойная сердечная недостаточность/дисфункция ЛЖ', ' (в частности, ФВ ≤ 40 %)'));

    aLi.push(createLi('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF_1 cls4BRF', 'liArtificialHeartValve', '10000000000000000', ' искусственный клапан сердца'));

    createCard('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF_1 cls4BRF', '100001000000000', 'хроническая сердечная недостаточность ', vCardCounter, aLi.join(''), 'ulIsHeartInsuff');
    aLi = [];

    // Hormone Taking

    aLi.push(createLi('cls3RF clsFemaleLvl', '', '10000000000000000', ' применение эстроген-гестагенных препаратов', ' (контрацепция или гормональная заместительная терапия)'));

    aLi.push(createLi('cls3RF clsFemaleLvl', '', '1000000100000000', ' применение селективных модуляторов эстрогеновых рецепторов'));

    aLi.push(createLi('cls1RF cls3RF', '', '1000000000000000', ' гормональная заместительная терапия'));

    createCard('cls1RF cls3RF', '1100000010000000', 'применение гормональных препаратов ', vCardCounter, aLi.join(''), '');
    aLi = [];

    // Stroke

    aLi.push(createLi('cls1RF cls2BRF cls3RF cls3BRF_1 liSumTherRF_1 liStroke_1', '', '1000000151000100', ' острый период инсульта', ' - учитывается 30 суток т. к. используемая шкала принимает как параметр этот срок острого периода (несмотря на то, что в России острым считается период 21 сутки)'));

    aLi.push(createLi('cls2RF cls2BRF liSumAtrFibrRF_1 liStroke_1', '', '1000000000000000', ' инсульт в анамнезе'));

    createCard('cls1RF cls2RF cls2BRF cls3RF cls3BRF_1', '1000000000000000', 'ОНМК ', vCardCounter, aLi.join(''));
    aLi = [];

    // Kidney Failure

    aLi.push(createLi('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF_1 cls4BRF liSevereRenalInsuff_1 liSevereRenalInsuff_2', 'liChronicDialysis', '1000000000000000', ' хронический диализ'));

    aLi.push(createLi('cls2BRF  cls3BRF_1 cls4BRF liSevereRenalInsuff_1 liSevereRenalInsuff_2', '', '1000000000000000', ' трансплантация почки'));

    aLi.push(createLi('cls3RF clsObstComorbidities', '', '1000000100000000', ' нефротический синдром'));

    aLi.push(createLi('cls1BRF cls2BRF cls3BRF_1 cls4BRF cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF liGlomerFiltrRate_1', 'liGlomerFiltrRate30_59', '101.000000000000', ' скорость клубочковой фильтрации 30—59 мл/мин'));

    aLi.push(createLi('cls1BRF cls2BRF cls3BRF_1 cls4BRF cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF liGlomerFiltrRate_1 liSevereRenalInsuff_1', 'liGlomerFiltrRateLess30', '102.500000000000', ' скорость клубочковой фильтрации &lt; 30 мл/мин'));

    createCard('cls1BRF cls2BRF cls3BRF_1 cls4BRF cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF', '1000000000000000', 'почечная недостаточность ', vCardCounter, aLi.join(''), 'ulIsRenalInsuff');
    aLi = [];



    // Liver Failure

    aLi.push(createLi('cls1BRF cls3BRF_1', '', '1000000000000000', ' печеночная недостаточность (МНО &gt; 1,5)'));

    aLi.push(createLi('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF cls3BRF_1 cls4BRF', '', '1000000000000000', ' нарушение функции печени', '. Хронические болезни печени (цирроз), либо значительные сдвиги в печеночных пробах (повышение билирубина &gt; чем в 2 раза от верхней границы нормы + повышение АЛТ/АСТ/щелочной фосфатазы &gt; чем в 3 раза от верхней границы нормы)'));

    createCard('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF_1 cls4BRF', '102.501000000100', 'печеночная недостаточность ', vCardCounter, aLi.join(''), 'ulIsLiverFailure');
    aLi = [];

    // Bad Habits

    aLi.push(createLi('cls2BRF', '', '1000001000000000', ' злоупотребление алкоголем', ' (&gt; 8 стаканов в неделю)'));

    aLi.push(createLi('cls10RF', '', '1000000000000000', ' текущее внутривенное употребление наркотиков'));

    aLi.push(createLi('cls10RF', '', '1000000000001010', ' курение'));

    createCard('cls2BRF cls10RF', '1000000000000000', 'вредные привычки ', vCardCounter, aLi.join(''));
    aLi = [];

    // Bleeding

    aLi.push(createLi('cls1BRF', '', '104.000000000000', ' кровотечения', ' &lt; чем за 3 мес до госпитализации'));

    aLi.push(createLi('cls3BRF_1 cls10BRF', '', '1000000001000100', ' продолжающееся активное кровотечение'));

    aLi.push(createLi('cls4BRF', '', '1000000001000100', ' трудно контролируемое кровотечение во время текущего оперативного лечения /обширность хирургического вмешательства'));

    aLi.push(createLi('cls2BRF cls3BRF_1 cls4BRF', 'liPriorMajorBleeding', '1000000001000100', ' кровотечение в анамнезе', ' (интракраниальное, либо требующее госпитализации, либо со снижением Hb &gt; 2 г/л, либо требующее гемотрансфузии)'));

    createCard('cls1RF cls2BRF cls3BRF_1 cls4BRF cls10BRF', '1000000000000000', 'кровотечение активное или в анамнезе ', vCardCounter, aLi.join(''));
    aLi = [];

    // Single RF

    createBtn('cls2BRF cls3BRF_1 cls4BRF', '', '1000001001100000', ' текущее применение антикоагулянтов, антиагрегантов или тромболитических препаратов');

    createBtn('cls2BRF', '', '1000001000000000', ' лабильное МНО', ' (&lt; 60% времени в терапевтическом диапазоне)');

    createBtn('cls4RF cls5RF', 'btnSpCordDamage', '1000000000000000', ' повреждение спинного мозга в анамнезе');

    createBtn('cls1RF cls3RF liSumTherRF_1', '', '1000000010000000', ' острый инфаркт миокарда', ' - 12-14 дней от начала, подострый - до 2 месяцев.');

    createBtn('cls10BRF', '', '1000000000000100', ' высокий риск кровотечения в родах', ' (например, предлежание плаценты)');

    createBtn('cls3RF', 'ulLargeOperIn30Days', '1000000010000000', ' большая операция &lt; 1 мес. назад');

    createBtn('cls10RF', '', '1000000000003000', ' гиперемезис', ': форма раннего токсикоза, основными симптомами которой являются сильная тошнота, регулярная рвота, ощущение слабости.');

    createBtn('cls10RF', '', '1000000000003000', ' синдром гиперстимуляции яичников', ' (учитывается только в первом триместре)');

    createBtn('cls3RF clsFemaleLvl', 'liStillbirthsMiscarriagesPrematureBirth', '1000000010000000', ' необъяснимые мертворождения, выкидыши (&ge; 3), преждевременные роды с токсикозом или задержка внутриутробного развития');

    createBtn('cls10RF', '', '1000000000001010', ' роды в анамнезе больше 3');

    createBtn('cls10RF', '', '1000000000003030', ' хирургические вмешательства во время беременности или в раннем послеродовом периоде', ', за исключением немедленного восстановления промежности, а также аппендэктомии, послеродовой стерилизации');

    createBtn('cls3RF', '', '1000000010000000', ' отек нижних конечностей');

    createBtn('cls3RF cls10RF', '', '1000000110001010', ' варикозное расширение вен нижних конечностей');

    createBtn('cls3RF', '', '1000000100000000', ' сдавление вен', ' опухолью, гематомой и пр.');

    createBtn('cls3RF cls4RF', '', '1000000110020000', ' воспалительные заболевания толстого кишечника');

    createBtn('cls3BRF_1', '', '1000000001000000', ' люмбальная пункция, эпидуральная или спинномозговая анестезия', ' за 4 ч. до или в течение 12 ч после операции');

    // createBtn('cls4RF', 'btnGeneralAnesthesia', '10000001000000000', ' общая анестезия');

    createBtn('cls2RF', '', '1000010000000000', ' сосудистое заболевание', ' (инфаркт миокарда в анамнезе, периферический атеросклероз, атеросклеротические бляшки в аорте)');

    createBtn('cls2BRF', '', '1000001000000000', ' совместный прием антикоагулянтов и НПВП', ' (нестероидных противовоспалительных препаратов)');

    createBtn('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF_1 cls4BRF', 'ulActiveUlcerOfStomachOrDuodenum', '104.500000000000', ' активная язва желудка или двенадцатиперстной кишки');

    createBtn('cls1BRF', '', '102.500000000000', ' пребывание в отделении интенсивной терапии', ' в период госпитализации');

    createBtn('cls1BRF cls3RF', 'btnCentralVeinCatheter', '102.001220000000', ' катетер в центральной вене');

    createBtn('cls3RF', '', '1000000100000000', ' пароксизмальная ночная гемоглобинурия');

    createBtn('cls4RF', '', '1000000100000000', ' наложение жгута/турникета во время операции');

    createBtn('cls4RF', '', '1000000020000000', ' гипсовая иммобилизация конечности', ' &lt; 1 мес.');

    createBtn('cls9RF', '', '1000000100000000', ' лейкоциты крови &gt; 11 × 10<sup><small>9</small></sup>/л');

    createBtn('cls4RF', 'btnArthritis', '1000000100000000', ' воспаление суставов нижних конечностей (артрит), остеомиелит');

    createBtn('cls4RF cls10RF', 'btnDehydration', '1000000100000010', ' дегидратация', ' - cостояние, связанное со значительными потерями воды (потоотделение, рвота, диурез, диарея), либо недостаточным поступлением воды в организм');

    createBtn('cls3RF', '', '1000000100000000', ' миелопролиферативные заболевания', ': эссенциальная тромбоцитемия (увеличение числа тромбоцитов), истинная полицитемия (увеличенное количество эритроцитов), хронический миелолейкоз (увеличенное количество лейкоцитов)');
}
creatMirrorRF();
$('#accListRF .card, #accListRF li,  #accListRF .btnSingleRF, span.reference').hide();
oPat.pkGender === 1 ? $('.clsFemaleLvl').hide() : '';

const showRF = (aRF, vB) => {
    let aSRF = [];
    vB ? $(aRF).each((ind, el) => $.merge(aSRF, $(`.cls${el}BRF`))) : '';
    $(aRF).each((ind, el) => $.merge(aSRF, $(`.cls${el}RF`)));
    if (aRF && vB) {
        (aRF.includes(4) && aRF.includes(10)) ? aSRF = $.merge($(aSRF), $('.cls3BRF_1')): '';
        ($.inArray(4, aRF) === -1 && $.inArray(10, aRF) === -1) ? aSRF = $.merge($(aSRF), $('.cls3BRF_1')): '';
    };
    oPat.pkDateOfChildbirth ? $.merge($(aSRF), $('.clsLabourRF')) : '';

    $.extend({
        distinct: function (anArray) {
            let result = [];
            $.each(anArray, function (i, v) {
                if ($.inArray(v, result) === -1) result.push(v);
            });
            return result;
        }
    });
    $($.distinct(aSRF)).show();
};
showRF(oPat.pkMedProfiles, oPat.pkCalculateRiskOfBleeding);

// Behavior Inside Mirror RF

$("#accListRF .btnSingleRF").on('click', function () {
    $(this).toggleClass('btn-secondary');
});

$("#accListRF li").on('click', function (vTB) {
    vTB = $(this).parents('.collapse').siblings().find('button');
    $(this).toggleClass('list-group-item-secondary');
    $(this).parents('div.card').hasClass('clsOneChoice') ? $(this).siblings().removeClass('list-group-item-secondary') : '';
    $(this).hasClass('list-group-item-secondary') ? $(vTB).addClass('btn-secondary') : !$(this).siblings().hasClass('list-group-item-secondary') ? $(vTB).removeClass('btn-secondary') : '';
});

$('span.preReference').on('click', function () {
    $(this).hide().next().show();
})
$('span.reference').on('click', function () {
    $(this).hide().prev().show();
});

const makeLiInteract_1 = (it_1, it_2) => {
    $(it_1).on('click', function (vTB) {
        vTB = $(this).parents('.collapse').siblings().find('button');
        $(it_1).hasClass('list-group-item-secondary') ? $(it_2).addClass('list-group-item-secondary') : !$(this).siblings().hasClass('list-group-item-secondary') ? $(vTB).removeClass('btn-secondary') : '';
    });
}


makeLiInteract_1('#liSepsis', '#liAcuteInflamDisease');
makeLiInteract_1('.liThromboemb_2', '#liWasPulmEmb');
makeLiInteract_1('.liNeoplasm_2', '#liActiveNeoplasm');
makeLiInteract_1('#liHeartInsuff3_4, #liHeartInsuffLess1Month, #liCongestHeartFailOrSystLVDysfunctEFLess40Percent', '#liSomeHeartInsuff');

const doActiveOneInGroup = (el) => {
    $(el).on('click', function () {
        $(el).not(this).removeClass('list-group-item-secondary');
    });
}

doActiveOneInGroup('.liLungDiseases_1');
doActiveOneInGroup('.liBurnsSuperficial_1');
doActiveOneInGroup('.liBurnsDeep_1');
doActiveOneInGroup('.liThermalInhalationInjury_1');
doActiveOneInGroup('.liThrombocytopenia_2');
doActiveOneInGroup('.liGlomerFiltrRate_1');

function countRF() {

    oPat.pkDiabetes = $('#ulIsDiabetes').hasClass('btn-secondary') ? true : false;
    oPat.pkActiveUlcerOfStomachOrDuodenum = $('#ulActiveUlcerOfStomachOrDuodenum').hasClass('btn-secondary') ? true : false;
    oPat.pkSevereHepaticFailure = $('#ulIsLiverFailure').hasClass('btn-secondary') ? true : false;

    oPat.pkChronicDialysis = $('#liChronicDialysis').hasClass('list-group-item-secondary') ? true : false;
    oPat.pkArtificialHeartValve = $('#liArtificialHeartValve').hasClass('list-group-item-secondary') ? true : false;

    oPat.pkUncontroldSystHypert = $('#liUncontrolSystHypert').hasClass('list-group-item-secondary') ? true : false;
    oPat.pkHeartInsuff3_4 = $('#liHeartInsuff3_4').hasClass('list-group-item-secondary') ? true : false;


    $('span.preReference, span.reference').remove();

    let aRFVal = [];

    aRFVal.push(oPat.pkGender === 1 ? '101.000000000000' : '1000010000000000');
    $('#ulIsAcuteInflamDiseaseOrInf').hasClass('btn-secondary') && $('#ulIsRestrictedMobility').hasClass('btn-secondary') ? aRFVal.push('1000000200000000') : '';
    ($('.liSevereRenalInsuff_2').hasClass('list-group-item-secondary') || oPat.pkGFR < 30) ? aRFVal.push('1000001000000000'): '';
    $('#ulIsTraum, #ulLargeOperIn30Days').hasClass('btn-secondary') ? aRFVal.push('1200000000000000') : '';
    $('#ulIsPulmInsuff').hasClass('btn-secondary') ? aRFVal.push('1100000000000000') : '';
    $('.liSevereRenalInsuff_1').hasClass('list-group-item-secondary') || $('#ulIsLiverFailure').hasClass('btn-secondary') ? aRFVal.push('1000000001000000') : '';
    $('#ulIsHemorrSyndrome').hasClass('btn-secondary') || $('#liPriorMajorBleeding, #liHbLess_100').hasClass('list-group-item-secondary') ? aRFVal.push('1000001000000000') : '';
    $('.liStroke_1').hasClass('list-group-item-secondary') && $('#liPlegia').hasClass('list-group-item-secondary') ? aRFVal.push('1000000300030000') : '';
    $('.clsObstComorbidities').hasClass('list-group-item-secondary') || $('.clsObstComorbidities').hasClass('btn-secondary') ? aRFVal.push('1000000000003020') : '';
    $('#ulIsRestrictedMobility, #btnDehydration').hasClass('btn-secondary') ? aRFVal.push('1000000000001000') : '';
    $('#btnArthritis').hasClass('btn-secondary') && $('#ulIsRestrictedMobility').hasClass('btn-secondary') ? aRFVal.push('1000000000010000') : '';

    const putVal = (item, val) => $(item).hasClass('list-group-item-secondary') ? aRFVal.push(val) : '';

    putVal('.liSystHypert_1', '1000001000000000');
    putVal('.liSumTherRF_1', '1100000000000000');
    putVal('.liSumTherRF_2', '1100000000000000');
    putVal('.liThromboemb_1, .liSumAtrFibrRF_1', '1000020000000000');
    putVal('.liThromboemb_1', '130000013000000');
    putVal('.liThromboemb_3', '1300000130000010');
    putVal('.liProvocedVTE_1', '1000000000000020');
    putVal('.liTraum_1', '1000000050000000');
    putVal('.liHighRiskThrombophilia_1', '1300000300003030');
    putVal('.liNeoplasm_1', '132.000100000000');
    putVal('.liNeoplasm_2', '1000000300000000');
    putVal('.liStroke_1', '1000001000000000');
    putVal('.liSevereRenalInsuff_1', '1000000000100100');
    putVal('.liBurns_1', '1000000200000000');
    putVal('.liBurns_2', '1000000300000000');
    putVal('#liSpinalCordInjure, #liPlegia', '1000000350000000');
    putVal('.liСoagulopathy_1', '1000000000000100');
    putVal('.liLabourRuRF_1', '1000000000000020');
    putVal('.liThrombocytopenia_1', '1000000001000000');

    oPat.pkPostpartum ? aRFVal.push('1000000110000000') : '';

    if (oPat.pkIsOrNoSurg) {
        oPat.oSelOp.pkArtroplasty ? aRFVal.push('1000000300000000') : '';
        oPat.oSelOp.pkArthroscopicSurgery ? aRFVal.push('1000000000000000') : '';
        oPat.oSelOp.pkShinFractureSurgery ? aRFVal.push('1000000000000000') : '';
        oPat.oSelOp.pkHipFractureSurgery ? aRFVal.push('1000000300000000') : '';
        oPat.oSelOp.pkLiverResection ? aRFVal.push('10000000000000001') : '';
        oPat.oSelOp.pkPancreatoDuodResection ? aRFVal.push('1000000001000000') : '';
        oPat.oSelOp.pkPulmonectomy ? aRFVal.push('10000000000000001') : '';
        oPat.oSelOp.pkLaparoscopicIntervention ? aRFVal.push('1000000000000000') : '';
        oPat.oSelOp.pkHeartSurgery ? aRFVal.push('1000000001000000') : '';
        oPat.oSelOp.pkBrainOrSpinalCordSurg ? aRFVal.push('1000000001000000') : '';
        oPat.oSelOp.pkElectiveCSection ? aRFVal.push('1000000000001000') : '';
        oPat.oSelOp.pkCSectionInLabour ? aRFVal.push('1000000000002010') : '';

        aRFVal.push(oPat.pkGradeOfOper > 0 ? '1000000000000000' : '1000000000000000');
    }

    oPat.pkGeneralListOfRF = [];


    if (oPat.pkAge > 35) {
        aRFVal.push('1000000000001010');
        const ageEnding = item => {
            let vA = +String(item).split('').pop();
            return vA === 1 ? 'год' : vA > 1 && vA < 5 ? 'года' : 'лет';
        }
        oPat.pkGeneralListOfRF.push(` возраст ${oPat.pkAge} ${ageEnding(oPat.pkAge)}`);
    }
    oPat.pkAge > 40 ? aRFVal.push('1000000000000000') : '';
    oPat.pkAge > 40 && oPat.pkAge < 61 ? aRFVal.push('1000000010000000') : '';
    oPat.pkAge > 60 && oPat.pkAge < 76 ? aRFVal.push('1000000020000000') : '';
    oPat.pkAge > 64 && oPat.pkAge < 75 ? aRFVal.push('1000010000000000') : '';
    oPat.pkAge >= 40 && oPat.pkAge < 85 ? aRFVal.push('101.500000000000') : '';
    oPat.pkAge > 65 ? aRFVal.push('1000001000000000') : '';
    oPat.pkAge > 70 ? aRFVal.push('1100000000000000') : '';
    oPat.pkAge >= 75 ? aRFVal.push('1000020030000000') : '';
    oPat.pkAge >= 85 ? aRFVal.push('103.500000000000') : '';


    oPat.pkBMI > 25 ? (aRFVal.push('1000000010000000'), oPat.pkGeneralListOfRF.push(` ${oPat.pkBMI <= 30 ? 'избыточный вес': 'ожирение'} (ИМТ > ${oPat.pkBMI} кг/м2)`)) : '';
    oPat.pkBMI > 30 ? aRFVal.push('1100000100000000') : '';
    oPat.pkBMI > 30 && oPat.pkBMI < 40 ? aRFVal.push('1000000100001010') : '';
    oPat.pkBMI > 35 ? aRFVal.push('1000000000000000') : '';
    oPat.pkBMI > 40 ? aRFVal.push('1000000000002000') : '';

    oPat.pkIsGenAnesth ? (aRFVal.push('10000001000000000'), oPat.pkGeneralListOfRF.push(' общая анестезия')) : '';

    let selectedRF = [];
    $.merge(selectedRF, $('#accListRF button.btn-secondary'));
    $(selectedRF).each((ind, el) => {
        aRFVal.push($(el).val())
    });
    selectedRF.length = 0;

    $.merge(selectedRF, $('#accListRF li.list-group-item-secondary'));
    $(selectedRF).each((ind, el) => {
        aRFVal.push(el.dataset.value);
    });
    selectedRF.length = 0;

    $.merge(selectedRF, $('#accListRF .btnSingleRF.btn-secondary, #accListRF li.list-group-item-secondary'));
    $(selectedRF).each((ind, el) => {
        oPat.pkGeneralListOfRF.push($(el).text());
    });

    console.log(aRFVal, oPat.pkGeneralListOfRF, oPat);




    // let oPatForCounter = {
    //     age: oPat.pkAge,
    //     isOrNoSurg: oPat.pkIsOrNoSurg,
    //     operTimeMore60: oPat.pkOperTimeMore60,
    //     gradeOfOper: oPat.pkGradeOfOper
    // };
    // $.post('/count', {
    //         'rfArr': aRFVal.join(),
    //         'oPatForCounter': JSON.stringify(oPatForCounter),
    //     },
    //     function (data) {
    //         localStorage.setItem('objScalesVTE', data);
    //         let fromRfArr = localStorage.getItem('objScalesVTE');
    //         let objBallsRiskVTE = JSON.parse(fromRfArr);
    //         console.log(objBallsRiskVTE.vCounterPaduaScore);
    //         console.log(JSON.parse(data));

    // let objBallsRiskVTE = JSON.parse(localStorage.getItem('objScalesVTE'));
    // localStorage.removeItem('objScalesVTE');
    // console.log(objBallsRiskVTE);

    // });
    serialObj = JSON.stringify(oPat);
    localStorage.setItem('Patient', serialObj);
    // $(location).attr('href', '/vte_concl');
}

$('#btnOne').on('click', countRF);


// Old Body Start

// $('#ulIsRenalInsuff').on('click', function () {
//     ($(this).html() === ('&gt;')) ? $('#frmGFR_CC').hide(): ($('#frmGFR_CC').show(), alert('Важно! Вводимые единицы измерения креатинина должны точно соответствовать его введенному значению. Если значение креатинина не введено, программа расценивает функцию почек как норму.'));
// });


// Old Body End



// $('#inpCreatinineVal').val() == '' ? creatinVal = 90: creatinVal = $('#inpCreatinineVal').val();

// creatinUnits = $('#slctCrUnitsGroup').val();
// ($('#chkRaceB').is(':checked')) ? oPat.pkRace = 1: '';

// console.log(`GFR: ${calcCCAndGFR(oPat.pkGender, oPat.pkAge, oPat.pkWeight, oPat.pkRace, creatinVal, creatinUnits)}`);

// oPat.pkCC = calcCCAndGFR(oPat.pkGender, oPat.pkAge, oPat.pkWeight, oPat.pkRace, creatinVal, creatinUnits)[0];
// oPat.pkGFR = calcCCAndGFR(oPat.pkGender, oPat.pkAge, oPat.pkWeight, oPat.pkRace, creatinVal, creatinUnits)[1];

// oPat.pkGFR > 29 && oPat.pkGFR < 60 ? $('#liGlomerFiltrRate30_59').prop('checked', true) : (oPat.pkGFR < 30) ? $('#liGlomerFiltrRateLess30').prop('checked', true) : '';

