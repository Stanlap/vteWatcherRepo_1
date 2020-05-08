let oPat = JSON.parse(localStorage.getItem('Patient'));
localStorage.removeItem('Patient')
console.log(oPat);

let vIsShow= false,
vCardCounter= 0,
aLi =[];

const createCard = (cls, val, title, ind, content, id) => {
    vCardCounter ++;
    $('#accListRF').append(`<div class="card"><div class="card-header" id="divCHeader_${ind}"><h5 class="mb-0"><button type="button"  class="btn btn-block ${cls}" id="${id}" value="${val}" data-toggle="collapse" data-target="#collapse_${ind}" aria-controls="collapse_${ind}">${title}</button></h5></div>
    <div id="collapse_${ind}" class="collapse ${vIsShow ? '': 'show'}" aria-labelledby="divCHeader_${ind}" data-parent="#accListRF"><div class="card-body"><ul class="list-group list-group-flush">${content}</ul></div></div></div>`);
    vIsShow = true;
}
const creatReference= cmt=> cmt ? `<span class="preReference"> &hellip;</span><span class="reference"> ${cmt}</span>`: '';   
const creatTitle= (ttl, cmt)=> `${ttl}${creatReference(cmt)}`;

const createLi = (cls, id, vle, ttl, cmt)=> ($(`<li class="list-group-item ${cls}" id="${id}" value="${vle}">${creatTitle(ttl, cmt)}</li>`).prop('outerHTML'));

// High Blood Pressure
aLi.push(createLi('cls2RF', 'liSystHypert1th', '1000000000000000', ' артериальная гипертензия 1 степени', ', CАД 140-159 или ДАД 90-99 мм рт. ст.'));

aLi.push(createLi('cls2BRF clsSystHypert2thAndMoreStg', 'liSystHypert2th', '1000000000000000',' артериальная гипертензия 2 степени', ', САД 160-179 или ДАД 100-109 мм рт. ст.'));

aLi.push(createLi('cls2BRF clsSystHypert2thAndMoreStg', 'liSystHypert3th', '1000000000000000',' артериальная гипертензия 3 степени', ', САД &ge; 180 или АД &ge; 110 мм рт. ст.'));

aLi.push(createLi('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF cls4BRF clsSystHypert2thAndMoreStg',  'liUncontrolSystHypert', '1000000001000100',' неконтролируемая артериальная гипертензия', ', артериальное давление &ge; 200 мм рт.ст. систолическое или &ge; 120 мм рт.ст. диастолическое'));

createCard('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF cls4BRF', '1000010000000000','артериальная гипертензия', vCardCounter, aLi.join(''));
aLi= [];

// Diabetes mellitus
aLi.push(createLi('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF cls4BRF  clsObstComorbidities', '', '1000000000000000', '<span> сахарный диабет</span> I типа с нефропатией', ''));

aLi.push(createLi('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF cls4BRF', '', '1000000000000000','<span> сахарный диабет</span> II типа', ''));

createCard('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF cls2BRF  cls3BRF cls4BRF ul2_LvlRF', '100001000000000','сахарный диабет', vCardCounter, aLi.join(''));
aLi= [];

// Acute Infection

aLi.push(createLi('cls3RF', 'liAcuteInflamDisease', '10000000000000000',' острое воспалительное заболевание', ''));

aLi.push(createLi('cls3RF', 'liSepsis', '1000000310000000',' сепсис (&lt; 1 мес.)', ''));

aLi.push(createLi('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF', '', '1000000000000000',' септический эндокардит', ''));

aLi.push(createLi('cls1RF cls3RF liSumTherRF_2', '', '1000000000000000',' острая инфекция', ''));

createCard('cls1RF cls2RF cls3RF cls4RF cls5RF cls8RF cls9RF cls10RF ul2_LvlRF', '1000000000001000','острое воспалительное заболевание или инфекция', vCardCounter, aLi.join(''),'ulIsAcuteInflamDiseaseOrInf');
aLi= [];

// Therm trauma

aLi.push(createLi('cls8RF chkBurnsSuperficial_1 chkBurns_1', '', '1000000000020000',' ожоги поверхностные, площадью &lt; 20% поверхности тела', ''));

aLi.push(createLi('cls8RF chkBurnsSuperficial_1 chkBurns_2', '', '1000000000030000','<span><span hidden>ожоги поверхностные, площадью</span> &gt; 20% поверхности тела</span>', ''));

aLi.push(createLi('cls8RF chkBurnsDeep_1 chkBurns_1', '', '1000000000020000','  ожоги глубокие, площадью &lt; 10% поверхности тела', ''));

aLi.push(createLi('cls8RF chkBurnsDeep_1 chkBurns_1', '', '1000000000030000',' ожоги глубокие, площадью от 10% до 20% поверхности тела', ''));

aLi.push(createLi('cls8RF hkBurnsDeep_1 chkBurns_2', '', '1000000000030000',' ожоги глубокие, площадью &gt; 20% поверхности тела', ''));

aLi.push(createLi('cls3RF cls8RF chkThermalInhalationInjury_1', '', '100000020000000',' термоингаляционная травма II степени', ''));

aLi.push(createLi('cls8RF chkThermalInhalationInjury_1', '', '1000000300000000',' термоингаляционная травма III степени', ''));

aLi.push(createLi('cls8RF', '', '1000000000030000',' отморожение II–IV степени', ''));

aLi.push(createLi('cls8RF cls3RF', '', '1000000300000000',' осложнения ожоговой болезни', ': шок, острая токсемия и септикотоксемия'));

createCard('cls8RF ul2_LvlRF', '1000000000000000','термическая травма', vCardCounter, aLi.join(''));
aLi= [];

// Onco

aLi.push(createLi('cls3RF cls9RF', '', '1000000000000000',' злокачественное новообразование в анамнезе', ''));

aLi.push(createLi('cls1RF cls3RF cls9RF liNeoplasm_1', '', '1000000100000000',' активное злокачественное новообразование', ': имеются локальные или отдаленные метастазы и/или химиотерапия/радиотерапия &lt; 6 мес назад'));

aLi.push(createLi('cls1RF cls3RF cls9RF liNeoplasm_1 liNeoplasm_2', '', '1100000000000000',' гормонотерапия у онкологических пациентов', ''));

aLi.push(createLi('cls1RF cls3RF cls9RF liNeoplasm_1 liNeoplasm_2', '', '1000000000000000',' химиотерапия, рентгенотерапия у онкологических пациентов', ''));

createCard('cls9RF ul2_LvlRF clsObstComorbidities', '1000000020000000','злокачественное новообразование', vCardCounter, aLi.join(''));
aLi= [];

// Rheumo

aLi.push(createLi('cls1BRF', 'liRheumDiseases', '1000000000000000','  ревматологическое заболевание', ''));

aLi.push(createLi('cls1RF liSumTherRF_2 clsObstComorbidities', 'liAcuteRheumDiseases', '1000000000000000',' острое ревматологическое заболевание', ': активная системная красная волчанка, воспалительная полиартропатия'));

createCard('cls9RF ul2_LvlRF clsObstComorbidities', '102.000000000000','ревматологическое заболевание', vCardCounter, aLi.join(''));
aLi= [];

// Lung Disease

aLi.push(createLi('cls3RF liBedRestMore3Days_1 liLungDiseases_1', 'liSevereLungDiseases', '1000000300000000','<span hidden> тяжелые заболевания легких</span> на ИВЛ', ': с выраженной дыхательной недостаточностью, требующие искусственной вентиляцией легких'));

aLi.push(createLi('cls3RF', 'liModerateLungDiseases', '1000000200000000','<span hidden> заболевания легких</span> без ИВЛ', ', в том числе пневмония, с дыхательной недостаточностью, не требующие искусственной вентиляции'));

aLi.push(createLi('cls3RF', '', '1000000010000000','<span hidden>заболевания легких длительностью</span> &lt; 1 мес.', ''));

aLi.push(createLi('cls3RF', '', '1000000010000000',' ХОБЛ', ' (хроническая обструктивная болезнь легких)'));

createCard('cls1RF ul2_LvlRF', '1000000100000000','заболевания легких с дыхательной недостаточностью', vCardCounter, aLi.join(''), 'ulIsPulmInsuff');
aLi= [];

// Anemia

aLi.push(createLi('cls9RF', 'liHbLess_100', '1000000100000000',' Hb &lt; 100 г/л'));

aLi.push(createLi('cls10RF clsObstComorbidities', '', '1000000000000000',' серповидноклеточная анемия'));

createCard('cls9RF cls10RF ul2_LvlRF', '1000000000000000','анемия', vCardCounter, aLi.join(''));
aLi= [];

// Thrombophilia

aLi.push(createLi('cls1RF cls3RF liHighRiskThrombophilia_1', '', '1000000030000000',' полиморфизм фактора Лейдена',' (V фактора свертывания крови)'));

aLi.push(createLi('cls1RF cls3RF liHighRiskThrombophilia_1', '', '1000000030000000',' полиморфизм протромбина G20210A'));

aLi.push(createLi('cls3RF liHighRiskThrombophilia_1', '', '1000000030000000',' гипергомоцистеинемия'));

aLi.push(createLi('cls1RF cls3RF liHighRiskThrombophilia_1', '', '1000000030000000',' повышенный уровень антител к кардиолипину', ' (антифосфолипидный синдром)'));


aLi.push(createLi('cls1RF cls3RF liHighRiskThrombophilia_1', '', '1000000030000000',' наличие волчаночного антикоагулянта', ' (антифосфолипидный синдром)'));

aLi.push(createLi('cls1RF cls3RF liHighRiskThrombophilia_1', '', '1000000030000000',' другая врожденная или приобретенная тромбофилия', ' (дефекты антитромбина, протеина С или S и др.)'));

aLi.push(createLi('cls10RF', '', '1000000000001000',' известная тромбофилия низкого риска (без ВТЭО)'));

createCard('cls1RF cls3RF ul2_LvlRF', '1000000000000000', 'тромбофилия ', vCardCounter, aLi.join(''));
aLi= [];

// Hypercoagulation

aLi.push(createLi('cls9RF', '', '1000000100000000',' тромбоциты &gt; 350 × 10 <sup><small>9</small></sup>/л'));

aLi.push(createLi('cls9RF', '', '1000000100000000',' фибриноген &gt; 400 мг/мл'));

aLi.push(createLi('cls9RF', '', '1000000100000000',' Д-димер &gt; 0,5 мкг/мл'));

createCard('cls9RF ul2_LvlRF', '1000000000000000', 'гиперкоагуляция ', vCardCounter, aLi.join(''));
aLi= [];

// Hemorragic Syndrome

aLi.push(createLi('cls2BRF cls10BRF liСoagulopathy_1', '', '1000000000000000',' геморрагические генетические коагулопатии', ' . Наиболее часто встречаются гемофилия и болезнь Виллебранда. Более редкие генетические нарушения включают гемофилию С, гипопроконвертинемию и ряд других аномалий.'));

aLi.push(createLi('cls2BRF cls10BRF liСoagulopathy_1', '', '1000000000000000',' геморрагические аутоиммунные коагулопатии', ' обусловлены появлением антител (ингибиторов свертывания) к факторам свёртывания крови или фосфолипидам. Наиболее часто встречается коагулопатия иммунного генеза на фоне Антифосфолипидного синдрома. Дефицит факторов свертывания в результате аутоиммунных реакций иногда происходит у пациентов после частых переливаний крови.'));

aLi.push(createLi('cls2BRF cls3BRF cls4BRF cls10BRF liСoagulopathy_1', '', '1000000000000000',' геморрагические приобретенные коагулопатии', ', могут быть обусловлены нарушением функции печени, применением разных антикоагулянтов, антиагрегантов или тромболитических препаратов, недостаточностью всасывания витамина «К» и повышенным потреблением компонентов системы свёртывания крови на фоне ДВС-синдрома. Поражение факторов свертываемости может быть в результате преждевременной отслойки плаценты, эмболии околоплодными водами и рака простаты. Коагулопатию вызывают некоторые виды гемотоксичных змеиных ядов, некоторые виды вирусных геморрагических лихорадок, иногда - лейкемия.'));

aLi.push(createLi('cls2BRF cls10BRF liСoagulopathy_1', '', '1000000000000000',' геморрагические вазопатии', '- заболевания, обусловленные патологией сосудов. Типичные заболевания этой группы — болезнь Рандю–Ослера, пурпура Шёнляйна–Геноха, первичные геморрагические васкулиты.'));

aLi.push(createLi('cls2BRF cls10BRF liThrombocytopenia_1', 'liPlateletsLess150', '1000000000000000', ' тромбоциты в крови &lt; 150 х 10<sup><small>9</small></sup>/л', ' (тромбоцитопения)'));

aLi.push(createLi('cls3BRF cls10BRF liThrombocytopenia_1', 'liPlateletsLess75', '1000000000000100',' тромбоциты в крови &lt; 75 х 10<sup><small>9</small></sup>/л'));

aLi.push(createLi('cls3BRF cls10BRF liThrombocytopenia_1', 'liPlateletsLess50', '104.000000000000',' тромбоциты в крови &lt; 50 х 10<sup><small>9</small></sup>/л'));

aLi.push(createLi('cls3RF liThrombocytopenia_1', '', '1000000030000000',' гепарин-индуцированная тромбоцитопения'));

aLi.push(createLi('cls3BRF', '', '1000000001000000',' нелеченная коагулопатия', '. Любая из коагулопатий без эффективной медикаментозной коррекции.'));

createCard('cls1BRF cls2BRF cls3RF cls3BRF cls4BRF cls10BRF ul2_LvlRF', '1000000000000000', 'геморраг. гемостазиопатии (геморраг. диатез, геморраг. с-м) ', vCardCounter, aLi.join(''), 'ulIsHemorrSyndrome');
aLi= [];

// VTE

aLi.push(createLi('cls1RF cls2RF cls3RF liSumAtrFibrRF_1 liThromboemb_1', 'liWasPulmEmb', '1000000000000000',' эпизод ВТЭО в анамнезе', ' (за исключением тромбоза поверхностных вен)'));

aLi.push(createLi('cls10RF liThromboemb_1 liThromboemb_2', '', '1000000000004030',' предшествующие рецидивирующие ВТЭО'));

aLi.push(createLi('cls10RF liThromboemb_1 liThromboemb_2', '', '1000000000000030',' предшествующие ВТЭО, ничем не спровоцированные или связанные с приемом эстрогенов'));

aLi.push(createLi('cls2RF cls3RF cls10RF liThromboemb_1 liThromboemb_2 liProvocedVTE_1', '', '1000000000004000',' предшествующие спровоцированные ВТЭО, кроме единичного эпизода, связанного с большим хирургическим вмешательством'));

aLi.push(createLi('cls2RF cls3RF cls10RF liThromboemb_1 liThromboemb_2 liProvocedVTE_1', '', '1000000000003000',' предшествующие ВТЭО спровоцированные большим хирургическим вмешательством'));

aLi.push(createLi('cls10RF liThromboemb_3', '', '10000000000000003',' тромбоэмболия в семейном анамнезе'));

createCard('cls3RF cls10RF ul2_LvlRF', '1000000000000000', 'ВТЭО в анамнезе ', vCardCounter, aLi.join(''));
aLi= [];

// Restricted Mobility


aLi.push(createLi('cls3RF', '', '1000000010000000',' постельный режим'));

aLi.push(createLi('cls1RF cls3RF cls10R', 'liBedRestMore3Days', '1000000120000000',' строгий постельный режим', ' (без посещения туалетной комнаты) &gt; 72 часов'));

aLi.push(createLi('cls3RF', '', '1000000020000000',' гипсовая иммобилизация конечности', ' (давностью до 1 мес.)'));

aLi.push(createLi('cls3RF', 'liPlegia', '1000000020000000',' паралич или глубокий парез', ' (тетра- геми- или нижний грубый монопарез/плегия)'));

aLi.push(createLi('cls3RF', '', '10000001000000000',' длительное положение сидя', ' (например длительный перелет в эконом-классе или поездка на транспорте сидя)'));

createCard('cls1RF cls3RF cls10RF ul2_LvlRF', '1300000000000010', 'ограниченная подвижность ', vCardCounter, aLi.join(''));
aLi= [];

// Is Trauma

aLi.push(createLi('cls3RF liTraum_1', '', '1000000000030000',' перелом костей таза', ' (давностью до 1 мес.)'));

aLi.push(createLi('cls3RF liTraum_1', '', '1000000000030000',' перелом бедра', ' (давностью до 1 мес.)'));

aLi.push(createLi('cls3RF  cls4RF liTraum_1', '', '1000000200000000',' изолированные переломы голени', ' (давностью до 1 мес.)'));

aLi.push(createLi('cls3RF  cls4RF', '', '10000002000000005',' повреждения связочного аппарата и сухожилий голени', ', требующие иммобилизации голеностопного сустава'));

aLi.push(createLi('cls3RF  cls4RF cls5RF  liSpinalCordInjure_1', '', '1000000000000000',' повреждение спинного мозга'));

aLi.push(createLi('cls3RF  cls4RF', '', '1000000350000000',' множественная и сочетанная травма'));

createCard('cls4RF cls5RF', '1000000000000000', 'есть травма &lt; 1 месяца назад ', vCardCounter, aLi.join(''), 'ulIsTraum');
aLi= [];









$("#accListRF li").on('click', function (vTB) {
    vTB = $(this).parents('.collapse').siblings().find('button');
    $(this).toggleClass('list-group-item-secondary');
    $(this).siblings().removeClass('list-group-item-secondary')
    $(this).hasClass('list-group-item-secondary') ? $(vTB).addClass('btn-secondary') : $(vTB).removeClass('btn-secondary');
});

$('span.reference').hide();

$('span.preReference').on('click', function () {
    $(this).hide().next().show();
})
$('span.reference').on('click', function () {
    $(this).hide().prev().show();
});

// $("#accListRF li").on('click', function (vTB) {
//     vTB = $(this).parents('.collapse').siblings().find('button');
//     $(this).toggleClass('list-group-item-secondary');
//     $(this).siblings().removeClass('list-group-item-secondary')
//     $(this).siblings('.list-group-item-secondary').length > 0 || $(this).hasClass('list-group-item-secondary') ? $(vTB).addClass('btn-secondary') : $(vTB).removeClass('btn-secondary');
// });





oPat.pkSevereHepaticFailure = false;
oPat.pkHeartInsuff3_4 = false;
oPat.pkDiabetes = false;
oPat.pkActiveUlcerOfStomachOrDuodenum = false;
oPat.pkChronicDialysis = false;
oPat.pkArtificialHeartValve = false;
oPat.pkUncontrolledSystemicHypertension = false;
oPat.pkRace = 0;
// oPat.pkHipFractureSurgery = false;

$('#divAllRF div').hide();
$('.divMiddleLvlRF').hide();
$('.divFemaleLvl').show();

$.extend({
    distinct: function (anArray) {
        let result = [];
        $.each(anArray, function (i, v) {
            if ($.inArray(v, result) === -1) result.push(v);
        });
        return result;
    }
});







$('.divSingleLvlRF').on('click', function (el) {
    el = $(this).closest('.divMiddleLvlRF').prev().find('input:checkbox');
    ($(this).closest('.divMiddleLvlRF').find('input:checkbox').is(':checked')) ? el.prop('checked', true): el.prop('checked', false);
});

$('.divMiddleLvlRF').on('click', function (event, el) {
    el = $(this).prev();
    (el.find('input:checkbox').is(':checked')) ? $(this).prev().hide(): ($(this).prev().show(), $(this).hide(), el.find('button').html('&gt;'));
});

$('.divSingleLvlRF label').next().on('click', function (ev) {
    $(this).next().show();
    $(this).hide();
    ev.stopPropagation();
});

$('.divSingleLvlRF label').next().next().on('click', function (ev) {
    $(this).prev().show();
    $(this).hide();
    ev.stopPropagation();
});

$('.btnTogglerRF').on('click', function () {
    ($(this).html() === ('&gt;')) ? ($(this).closest('.divTogglerRF').next().show(), $(this).html('&lt;')) : ($(this).parents('.divTogglerRF').next().hide(), $(this).html('&gt;'));
});

let selectedRF = [];

if (oPat.pkMedProfiles.includes(1)) {
    selectedRF = $.merge($(selectedRF), $('.cls1RF'));
    oPat.pkCalculateRiskOfBleeding ? selectedRF = $.merge($(selectedRF), $('.cls1BRF')) : '';
};

if (oPat.pkMedProfiles.includes(2)) {
    selectedRF = $.merge($(selectedRF), $('.cls2RF'));
    oPat.pkCalculateRiskOfBleeding ? selectedRF = $.merge($(selectedRF), $('.cls2BRF')) : '';
};


function isMedProfilesMoreTwo() {
    $.each(oPat.pkMedProfiles, function (index, value) {
        if (value > 2) return true;
    });
};

if (isMedProfilesMoreTwo()) {
    selectedRF = $.merge($(selectedRF), $('.cls3RF'));
    (oPat.pkCalculateRiskOfBleeding && oPat.pkMedProfiles.includes(4) && oPat.pkMedProfiles.includes(10)) ? selectedRF = $.merge($(selectedRF), $('.cls3BRF')): '';
    (oPat.pkCalculateRiskOfBleeding && $.inArray(4, oPat.pkMedProfiles) === -1 && $.inArray(10, oPat.pkMedProfiles) === -1) ? selectedRF = $.merge($(selectedRF), $('.cls3BRF')): '';
};

if (oPat.pkMedProfiles.includes(4)) {
    selectedRF = $.merge($(selectedRF), $('.cls4RF'));
    oPat.pkCalculateRiskOfBleeding ? selectedRF = $.merge($(selectedRF), $('.cls4BRF')) : '';
};

(oPat.pkMedProfiles.includes(5)) ? selectedRF = $.merge($(selectedRF), $('.cls5RF')): '';
(oPat.pkMedProfiles.includes(8)) ? selectedRF = $.merge($(selectedRF), $('.cls8RF')): '';
(oPat.pkMedProfiles.includes(9)) ? selectedRF = $.merge($(selectedRF), $('.cls9RF')): '';

if (oPat.pkMedProfiles.includes(10)) {
    oPat.pkObstOrGynProfile === 0 ? selectedRF = $.merge($(selectedRF), $('.cls10RF')): '';
    oPat.pkCalculateRiskOfBleeding ? selectedRF = $.merge($(selectedRF), $('.cls10BRF')) : '';
    oPat.pkPregnancyOrChildbirth === 1 ? selectedRF = $.merge($(selectedRF), $('.clsLabourRF')): '';
};

selectedRF = $.distinct(selectedRF);
$(selectedRF).show();

$('.divTogglerRF').show();

$('#divProfileOfPatient').hide();
if (oPat.pkGender === 1) {
    $('#chkFemale').prop('checked', false);
    $('#chkMaleDouble').prop('checked', true);
    $('.divFemaleLvl').hide();
} else {
    $('#chkFemale').prop('checked', true);
    $('#chkMaleDouble').prop('checked', false);
    $('.divFemaleLvl').show();
}

oPat.pkPregnancyOrChildbirth < 2 ? $('#chkPostpartum').prop('checked', true): '';
oPat.pkIsGenAnesth ? $('#chkGeneralAnesthesia').prop('checked', true): '';
oPat.pkHasCentrAVAccess ? $('#chkCentralVeinCatheter').prop('checked', true): '';




$('#btnIsRenalInsuff').on('click', function () {
    ($(this).html() === ('&gt;')) ? $('#frmGFR_CC').hide(): ($('#frmGFR_CC').show(), alert('Критически важно! Вводимые единицы измерения креатинина должны точно соответствовать его введенному значению. К сведению: если значение креатинина не введено, программа расценивает функцию почек как норму при назначении профилактики ВТЭО.'));
});

$('.liLungDiseases_1').on('click', function () {
    $('.liLungDiseases_1').not(this).prop('checked', false);
    if ($(this).is(':checked')) {
        ($(this).attr('id') === 'liSevereLungDiseases') ? $('#chkIsBedRestMore3Days, #liBedRestMore3Days').prop('checked', true): '';
        if ($(this).attr('id') === 'liModerateLungDiseases') {
            if ($('.liBedRestMore3Days_1').is(':checked')) {} else {
                $('#chkIsBedRestMore3Days').prop('checked', false);
                if ($('#liBedRestMore3Days').attr('data-hasMarked') == '0') {
                    $('#chkIsBedRestMore3Days, #liBedRestMore3Days').prop('checked', false);
                }
            }
        }
    }
});

$('.liBedRestMore3Days_1').on('click', function () {
    ($(this).is(':checked')) ? $('#chkIsBedRestMore3Days, #liBedRestMore3Days').prop('checked', true): ($('.liBedRestMore3Days_1').is(':checked')) ? $('#chkIsBedRestMore3Days, #liBedRestMore3Days').prop('checked', true) : ($('#liBedRestMore3Days').attr('data-hasMarked') == '0') ? $('#chkIsBedRestMore3Days, #liBedRestMore3Days').prop('checked', false) : '';
    console.log($('#liBedRestMore3Days').attr('data-hasMarked'));
});

$('#liBedRestMore3Days').on('click', function () {
    let a = $(this).attr('data-hasMarked');
    console.log(a);
    ($(this).is(':checked')) ? $(this).attr('data-hasMarked', '1'): $(this).attr('data-hasMarked', '0');
    ($('#chkIsBedRestMore3Days').is(':checked')) ? (alert('Отмечены ранее патологические состояния и риск-факторы, которые требуют соблюдения больным строгого постального режима'), $(this).prop('checked', true)) : '';
    console.log($(this).attr('data-hasMarked'));
});


$('.chkGlomerularFiltrationRate_1').on('click', function () {
    $('.chkGlomerularFiltrationRate_1').not(this).prop('checked', false);
});

$('.chkDiabetes_1').on('click', function () {
    $('.chkDiabetes_1').not(this).prop('checked', false);
});
$('.chkSystemicHypertension_1').on('click', function () {
    $('.chkSystemicHypertension_1').not(this).prop('checked', false);
});

$('.chkBurnsSuperficial_1').on('click', function () {
    $('.chkBurnsSuperficial_1').not(this).prop('checked', false);
});

$('.chkBurnsDeep_1').on('click', function () {
    $('.chkBurnsDeep_1').not(this).prop('checked', false);
});

$('.chkThermalInhalationInjury_1').on('click', function () {
    $('.chkThermalInhalationInjury_1').not(this).prop('checked', false);
});

$('.liSpinalCordInjure_1').on('click', function () {
    $('.liSpinalCordInjure_1').not(this).prop('checked', false);
});

$('#liSepsis').on('click', function () {
    ($(this).is(':checked')) ? $('#liAcuteInflamDisease').prop('checked', true): '';
});
$('#chkHeartInsuff3_4').on('click', function () {
    ($(this).is(':checked') && $('#lblSomeHeartInsuff').is(':visible')) ? $('#chkSomeHeartInsuff').prop('checked', true): '';
});
$('#chkHeartInsuffLess1Month').on('click', () => ($(this).is(':checked') && $('#lblSomeHeartInsuff').is(':visible')) ? $('#chkSomeHeartInsuff').prop('checked', true) : '')

$('#chkCongestHeartFailOrSystLVDysfunctEFLess40Percent').on('click', function () {
    ($(this).is(':checked') && $('#lblSomeHeartInsuff').is(':visible')) ? $('#chkSomeHeartInsuff').prop('checked', true): '';
});
$('.liNeoplasm_2').on('click', function () {
    ($(this).is(':checked')) ? $('#chkActiveNeoplasm').prop('checked', true).closest('.divSingleLvlRF').hide():
        ($('#chkActiveNeoplasm').attr('data-hasMarked') == '0') ? $('#chkActiveNeoplasm').prop('checked', false).closest('.divSingleLvlRF').show() : '';
});
$('#chkActiveNeoplasm').on('change', function () {
    ($(this).is(':checked')) ? $(this).attr('data-hasMarked', '1'): $(this).attr('data-hasMarked', '0');
});
$('#liAcuteRheumDiseases').on('click', function () {
    ($(this).is(':checked')) ? $('#liRheumDiseases').prop('checked', true).closest('.divSingleLvlRF').hide():
        ($('#liRheumDiseases').attr('data-hasMarked') == '0') ? $('#liRheumDiseases').prop('checked', false).closest('.divSingleLvlRF').show() : '';
});

$('#liPlateletsLess150').on('click', function () {
    if ($(this).is(':checked')) {
        $(this).attr('data-hasMarked', '1');
    } else {
        $(this).attr('data-hasMarked', '0');
        $('#liPlateletsLess50, #liPlateletsLess75').prop('checked', false);
    }
});
$('#liPlateletsLess75').on('click', function () {
    if ($(this).is(':checked')) {
        $('#liPlateletsLess150').prop('checked', true).closest('.divSingleLvlRF').hide();
        $(this).attr('data-hasMarked', '1');

    } else {
        $('#liPlateletsLess50').prop('checked', false).closest('.divSingleLvlRF').show();
        $('#liPlateletsLess150').attr('data-hasMarked') == '0' ? $('#liPlateletsLess150').prop('checked', false).closest('.divSingleLvlRF').show() : $('#liPlateletsLess150').closest('.divSingleLvlRF').show();
        $(this).attr('data-hasMarked', '0');
    }
});
$('#liPlateletsLess50').on('click', function () {
    ($(this).is(':checked')) ? $('#liPlateletsLess150, #liPlateletsLess75').prop('checked', true).closest('.divSingleLvlRF').hide():
        ($('#liPlateletsLess150').attr('data-hasMarked') == '1' && $('#liPlateletsLess75').attr('data-hasMarked') == '0') ? ($('#liPlateletsLess150').prop('checked', true).closest('.divSingleLvlRF').show(), $('#liPlateletsLess75').prop('checked', false).closest('.divSingleLvlRF').show()) : ($('#liPlateletsLess75').attr('data-hasMarked') == '1') ?
        $('#liPlateletsLess75, #liPlateletsLess150').prop('checked', true).closest('.divSingleLvlRF').show() :
        ($('#liPlateletsLess75, #liPlateletsLess150').attr('data-hasMarked') == '0') ? $('#liPlateletsLess75, #liPlateletsLess150').prop('checked', false).closest('.divSingleLvlRF').show() : '';
});


function countStratRF(vCounterRF, x) {
    let vStratRF = '';
    switch (x) {
        case 'Padua':
            vCounterRF > 3 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
            break;
        case 'IMPROVE':
            vCounterRF > 7 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
            break;
        case 'HAS_BLED':
            vCounterRF > 2 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
            break;
        case 'CHA2DS2_VASсOrRusSurgOrTraumRF':
            vCounterRF == 0 ? vStratRF = 'низкий' : (vCounterRF >= 1 && vCounterRF <= 2) ? vStratRF = 'умеренный' : vStratRF = 'высокий';
            return vStratRF;
            break;

        case 'Caprini':
            vCounterRF == 0 ? vStratRF = 'низкий' : (vCounterRF >= 1 && vCounterRF <= 2) ? vStratRF = 'умеренный' : (vCounterRF >= 3 && vCounterRF <= 4) ? vStratRF = 'высокий' : vStratRF = 'очень высокий';
            return vStratRF;
            break;
        case 'SurgOrTraumBleedingRF':
            vCounterRF >= 1 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
            break;
        case 'GreenTop37aRus':
            (vCounterRF > 0 && vCounterRF <= 2) ? vStratRF = 'умеренный': (vCounterRF > 2 && vCounterRF != 0) ? vStratRF = 'высокий' : '';
            //
            //            vCounterRF > 2 ? vStratRF = 'высокий' : vStratRF = 'умеренный';
            return vStratRF;
    }
}
$.each(objCreatinineUnits, function(key, value) {
    $('#slctCrUnitsGroup')
    .append($('<option>', { value : key })
    .text(key));
    });

// console.log(`CC and GFR: ${calcCCAndGFR(oPat.pkGender, oPat.pkAge, oPat.pkWeight, oPat.pkRace, creatinVal, creatinUnits)}`);

// let vRace = 1,
//     vCreatinineValueEntered = '',
//     vCreatinineUnits = '';
//     function calculateGFRAndСС() {
//     // Код универсального калькулятора для расчета КК и СКФ взят из открытолго источника http://boris.bikbov.ru/ Программирование: Бикбов Б.Т. Выполняя условия автора, дословно приводим комментарий, на котором настаивает автор кода:
//     // Данный код может свободно распространяться и модифицироваться при использовании в некоммерческих целях
//     // Обязательным условием использования и распространения данного кода являются:
//     // 1. Сохранение комментариев с указанием авторства Бикбова Б.Т. в программном коде JavaScript
//     // 2. Указание авторства Бикбова Б.Т. на странице с использованием данного програмного кода
//     // 3. Указание активной ссылки на сайт http://boris.bikbov.ru/ на странице с использованием данного програмного кода
//     //Комментарий автора кода.


//     let gfr_cg = '',
//         bsa = '',
//         gfr_cg_bsa = '',
//         vMDRD = '',
//         vMDRD_Standartized = '',
//         vCreatinineValue = '';
//         vSKD_EPI = '';

//         vCreatinineValue = vCreatinineValueEntered;
//     vCreatinineUnits = Number(vCreatinineUnits);
//     //    vCreatinineValue.replace(/[,]+/g, '.');

//     if ((vCreatinineValue <= 0.00003) || (vCreatinineValue >= 6500)) {
//         vCreatinineValue = 0;
//     }
//     // конвертирую креатинин
//     switch (parseInt(vCreatinineUnits)) {
//         case 1: // ммоль/л
//             vCreatinineValue = 1000 * vCreatinineValue / 88.4;
//             break;
//         case 2: // мкмоль/л
//             vCreatinineValue /= 88.4;
//             break;
//         case 4: // мкмоль/л
//             vCreatinineValue /= 10;
//             break;
//     }
//     // взрослые
//     if (vCreatinineValue > 0 && oPat.pkGender >= 0 && oPat.pkAge > 0) {
//         // CKD-EPI
//         if (oPat.pkGender == 0) {
//             if (vCreatinineValue <= 0.7) {
//                 vSKD_EPI = Math.pow((vCreatinineValue / 0.7), -0.329) * Math.pow(0.993, oPat.pkAge);
//             } else {
//                 vSKD_EPI = Math.pow((vCreatinineValue / 0.7), -1.209) * Math.pow(0.993, oPat.pkAge);
//             }
//         } else {
//             if (vCreatinineValue <= 0.9) {
//                 vSKD_EPI = Math.pow((vCreatinineValue / 0.9), -0.411) * Math.pow(0.993, oPat.pkAge);
//             } else {
//                 vSKD_EPI = Math.pow((vCreatinineValue / 0.9), -1.209) * Math.pow(0.993, oPat.pkAge);
//             }
//         }
//         // коэффициент для расы
//         if (vRace == 1) { // белые
//             if (oPat.pkGender == 0) {
//                 vSKD_EPI = vSKD_EPI * 144;
//             } else {
//                 vSKD_EPI = vSKD_EPI * 141;
//             }
//         } else { // негроидная
//             if (oPat.pkGender == 0) {
//                 vSKD_EPI = vSKD_EPI * 166;
//             } else {
//                 vSKD_EPI = vSKD_EPI * 163;
//             }
//         }
//         vSKD_EPI = Math.round(vSKD_EPI);
//         if (vRace == 2) { // негродидная
//             vRace = 1.212;
//         }
//         // 186 - для нестандартизованных наборов креатинина, 175 - для стандартизованных
//         if (oPat.pkGender == 0) {
//             vMDRD = Math.round((186 * (Math.pow(vCreatinineValue, -1.154)) * (Math.pow(oPat.pkAge, -0.203)) * vRace * 0.742));
//             vMDRD_Standartized = Math.round((175 * (Math.pow(vCreatinineValue, -1.154)) * (Math.pow(oPat.pkAge, -0.203)) * vRace * 0.742));
//         } else {
//             vMDRD = Math.round((186 * (Math.pow(vCreatinineValue, -1.154)) * (Math.pow(oPat.pkAge, -0.203)) * vRace * oPat.pkGender));
//             vMDRD_Standartized = Math.round((175 * (Math.pow(vCreatinineValue, -1.154)) * (Math.pow(oPat.pkAge, -0.203)) * vRace * oPat.pkGender));
//         }
//         //         кокрофт
//         if (oPat.pkWeight > 0) {
//             gfr_cg = ((140 - oPat.pkAge) * oPat.pkWeight / 72) / vCreatinineValue;
//             if (oPat.pkGender == 0) {
//                 gfr_cg = gfr_cg * 0.85;
//             }
//             if (oPat.pkHeight > 0) {
//                 bsa = (oPat.pkHeight * oPat.pkWeight / 3600);
//                 bsa = Math.sqrt(bsa);
//                 gfr_cg_bsa = gfr_cg * 1.73 / bsa;
//             }
//         }
//     }
//     oPat.pkGFR = Math.min(vSKD_EPI, vMDRD, vMDRD_Standartized);
//     oPat.pkCC = Math.round(gfr_cg_bsa);
//     console.log(oPat.pkGFR, oPat.pkCC);
//     console.log(vCreatinineValue, vCreatinineUnits, oPat.pkGender, oPat.pkAge, vRace, oPat.pkWeight, oPat.pkHeight);
// }





function countRF() {
    ($('#inpCreatinineVal').val() == '') ? creatinVal = 90 : creatinVal = $('#inpCreatinineVal').val();
    creatinUnits = $('#slctCrUnitsGroup').val();
    ($('#chkRaceB').is(':checked')) ? oPat.pkRace = 1 : '';

console.log(`GFR: ${calcCCAndGFR(oPat.pkGender, oPat.pkAge, oPat.pkWeight, oPat.pkRace, creatinVal, creatinUnits)}`);

oPat.pkCC = calcCCAndGFR(oPat.pkGender, oPat.pkAge, oPat.pkWeight, oPat.pkRace, creatinVal, creatinUnits)[0];
oPat.pkGFR = calcCCAndGFR(oPat.pkGender, oPat.pkAge, oPat.pkWeight, oPat.pkRace, creatinVal, creatinUnits)[1];

oPat.pkGFR > 29 && oPat.pkGFR < 60 ? $('#chkGlomerularFiltrationRate30_59').prop('checked', true) : (oPat.pkGFR < 30) ? $('#chkGlomerularFiltrationRateLess30').prop('checked', true) : '';

    ($('.clsSystHypert2thAndMoreStg').is(':checked')) ? $('#chkSystHypert2thAndMoreStg').prop('checked', true): '';
    ($('.chkSumTherRF_1').is(':checked')) ? $('#chkAcuteIschemicStrokeOrMiocardInfarction').prop('checked', true): '';
    ($('.liSumTherRF_2').is(':checked')) ? $('#liRheumDiseasesOrInfection').prop('checked', true): '';
    ($('.liThromboemb_1').is(':checked')) ? $('#chkVascularAnamnesis, #chkWasSomeVeinThromb').prop('checked', true): '';
    ($('.liThromboemb_2').is(':checked')) ? $('#liWasPulmEmb').prop('checked', true): '';
    ($('.liThromboemb_3').is(':checked')) ? $('#chkFamilyVeinThromb').prop('checked', true): '';
    ($('.liProvocedVTE_1').is(':checked')) ? $('#chkWasProvocedVTE').prop('checked', true): '';
    ($('.liTraum_1').is(':checked')) ? $('#chkFracturePpelvisFemurTibiaLess1Month').prop('checked', true): '';
    ($('.liHighRiskThrombophilia_1').is(':checked')) ? $('#chkIsKnownHighRiskThrombophilia').prop('checked', true): '';
    ($('.liNeoplasm_1').is(':checked')) ? $('#chkIsActiveNeoplasmOrTherapyOfNeoplasm').prop('checked', true): '';
    ($('.liNeoplasm_2').is(':checked')) ? $('#chkSomeTherapyOfNeoplasm').prop('checked', true): '';
    ($('.chkStroke_1').is(':checked')) ? $('#chkStroke').prop('checked', true): '';
    ($('#ulIsTraum, #chkLargeOperIn30Days').is(':checked')) ? $('#chkTraumOrOperIn30Days').prop('checked', true): '';
    ($('#ulIsPulmInsuff').is(':checked') || $('#chkIsHeartInsuff').is(':checked')) ? $('#chkPulmonOrHeartInsuff').prop('checked', true): '';
    ($('.chkSevereRenalInsuff_1').is(':checked')) ? $('#chkSevereRenalInsuff').prop('checked', true): '';
    ($('.chkSevereRenalInsuff_2').is(':checked') || oPat.pkGFR < 30) ? $('#chkSevereRenalInsuff_3').prop('checked', true): '';
    $('#chkIsLiverFailure').is(':checked') ? oPat.pkSevereHepaticFailure = true : '';
    $('#chkHeartInsuff3_4').is(':checked') ? oPat.pkHeartInsuff3_4 = true : '';
    $('#chkIsDiabetes').is(':checked') ? oPat.pkDiabetes = true : '';
    $('#chkActiveUlcerOfStomachOrDuodenum').is(':checked') ? oPat.pkActiveUlcerOfStomachOrDuodenum = true : '';
    $('#chkChronicDialysis').is(':checked') ? oPat.pkChronicDialysis = true : '';
    $('#chkArtificialHeartValve').is(':checked') ? oPat.pkArtificialHeartValve = true : '';
    $('#liUncontrolSystHypert').is(':checked') ? oPat.pkUncontrolledSystemicHypertension = true : '';

    ($('#chkSevereRenalInsuff, #chkIsLiverFailure').is(':checked')) ? $('#chkSevereRenalOrLiverFailure').prop('checked', true): $('#chkSevereRenalOrLiverFailure').prop('checked', false);


    ($('.chkBurns_1').is(':checked')) ? $('#chkBurnsLess20Percent').prop('checked', true): '';
    ($('.chkBurns_2').is(':checked')) ? $('#chkBurnsMore20Percent').prop('checked', true): '';
    ($('.clsObstComorbidities').is(':checked')) ? $('#chkIsObstComorbidityRF').prop('checked', true): '';
    ($('.chkLabourRuRF_1').is(':checked')) ? $('#chkSeverePreeclampsiaOrStillbirth').prop('checked', true): '';
    ($('.liSumAtrFibrRF_1').is(':checked')) ? $('#chkVascularAnamnesis').prop('checked', true): '';
    ($('.liThrombocytopenia_1').is(':checked')) ? $('#chkThrombocytopenia').prop('checked', true): '';

    ($('#chkIsHemorragicSyndrome, #chkPriorMajorBleeding, #liHbLess_100').is(':checked')) ? $('#chkBleedingOrHemorragicSyndrome').prop('checked', true): '';

    ($('#ulIsAcuteInflamDiseaseOrInf').is(':checked') && $('#chkIsRestrictedMobility').is(':checked')) ? $('#liAcuteInflamDiseaseOrInfectionWithBedRest').prop('checked', true): '';

    ($('.liSpinalCordInjure_1, #liPlegia').is(':checked')) ? $('#chkSpinalCordDamageWithPlegia').prop('checked', true): '';

    ($('.chkStroke_1').is(':checked') && $('#liPlegia').is(':checked')) ? $('#chkStrokeWithPlegia').prop('checked', true): '';

    ($('#chkArthritis').is(':checked') && $('#chkIsRestrictedMobility').is(':checked')) ? $('#chkArthritisWithRestrictedMobility').prop('checked', true): '';
    ($('#chkIsRestrictedMobility, #chkDehydration').is(':checked')) ? $('#chkIsRestrictedMobilityOrDehydration').prop('checked', true): '';
    ($('.liСoagulopathy_1').is(':checked')) ? $('#chkСoagulopathyWithoutThrombocytopenia').prop('checked', true): '';







    (oPat.pkArtroplasty) ? ($('#chkArtroplasty').prop('checked', true)) : '';
if(oPat.pkIsOrNoSurg){
    oPat.oSelOp.pkArthroscopicSurgery ? $('#chkArthroscopicSurgery').prop('checked', true): '';
    (oPat.oSelOp.pkShinFractureSurgery) ? $('#chkShinFractureSurgery').prop('checked', true): '';
    (oPat.oSelOp.pkHipFractureSurgery) ? ($('#chkHipFractureSurgery').prop('checked', true), oPat.pkHipFractureSurgery = true): oPat.pkHipFractureSurgery = false;

    (oPat.oSelOp.pkLiverResection) ? $('#chkLiverResection').prop('checked', true): '';
    (oPat.oSelOp.pkPancreatoDuodResection) ? $('#chkPancreatoDuodResection').prop('checked', true): '';
    (oPat.oSelOp.pkPulmonectomy) ? $('#chkPulmonectomy').prop('checked', true): '';
    (oPat.oSelOp.pkLaparoscopicIntervention) ? $('#chklaparoscopicIntervention').prop('checked', true): '';

    (oPat.oSelOp.pkHeartSurgery) ? $('#chkHeartSurgery').prop('checked', true): '';

    (oPat.oSelOp.pkBrainOrSpinalCordSurg) ? $('#chkBrainOrSpinalCordSurg').prop('checked', true): '';

    (oPat.oSelOp.pkElectiveCSection) ? $('#chkElectiveCSection').prop('checked', true): '';
    (oPat.oSelOp.pkCSectionInLabour) ? $('#chkCSectionInLabour').prop('checked', true): '';
}

    (oPat.pkAge > 35) ?
    $('#chkAgeMore35').prop('checked', true): '';
    (oPat.pkAge > 40) ?
    $('#chkAgeMore40').prop('checked', true): '';
    (oPat.pkAge > 40 && oPat.pkAge < 61) ?
    $('#chkAge_41_60').prop('checked', true): '';
    (oPat.pkAge > 60 && oPat.pkAge < 76) ?
    $('#chkAge_61_75').prop('checked', true): '';
    (oPat.pkAge > 64 && oPat.pkAge < 75) ?
    $('#chkAge_65_74').prop('checked', true): '';
    (oPat.pkAge >= 40 && oPat.pkAge < 85) ?
    $('#chkAge_40_84').prop('checked', true): '';
    (oPat.pkAge > 65) ? $('#chkAgeMore65').prop('checked', true): '';
    (oPat.pkAge > 70) ? $('#chkAgeMore70').prop('checked', true): '';
    (oPat.pkAge >= 75) ? $('#chkAgeMore75').prop('checked', true): '';
    (oPat.pkAge >= 85) ? $('#chkAgeMore85').prop('checked', true): '';

    (oPat.pkBMI > 25) ? $('#chkBMIMore25').prop('checked', true): '';
    (oPat.pkBMI > 30) ? $('#chkBMIMore30').prop('checked', true): '';
    (oPat.pkBMI > 30 && oPat.pkBMI < 40) ? $('#chkBMI_30_39').prop('checked', true): '';
    (oPat.pkBMI > 35) ? $('#chkBMIMore35').prop('checked', true): '';
    (oPat.pkBMI > 40) ? $('#chkBMIMore40').prop('checked', true): '';

    if (oPat.pkIsOrNoSurg) {
        (oPat.pkGradeOfOper > 0) ? ($('#chkLargeSurgery').prop('checked', true)) : $('#chkSmallSurgery').prop('checked', true);
    }
    let pkRfArr = [], pkRFText = [];
    ($('#divAllRF input:checkbox:checked')).each(function () {
        pkRfArr.push($(this).val());
    });

    console.log(pkRfArr.join());
    // console.log(JSON.stringify($.extend({}, pkRfArr)));
    let vIsBedRestBMI = $('#divAllRF input[id*="BMIMore"]:checked ').last();
    let vIsBedRestAge = $('#divAllRF input[id*="AgeMore"]:checked ').last();
    $('.ul2_LvlRF, .chk3_LvlRF input:checked').prop('checked', false);

    vIsBedRestBMI.prop('checked', true);
    vIsBedRestAge.prop('checked', true);

    function getStringOfRF(el) {
        let a = 0,
            b = '';
        $(el).each(function () {
            (a > 0) ? b += ',' + $(this).text(): b += $(this).text();
            a += 1;
        });
        return b;
    }

    oPat.pkGeneralListOfRF = getStringOfRF($('#divAllRF input:checked').parent()) !== '' ? getStringOfRF($('#divAllRF input:checked').parent()): 'отсутствуют';
    // console.log(oPat);

    let serialObj = JSON.stringify(oPat);
    localStorage.setItem('Patient', serialObj);
    let oPatForCounter = {
        age: oPat.pkAge,
        isOrNoSurg: oPat.pkIsOrNoSurg,
        operTimeMore60: oPat.pkOperTimeMore60,
        gradeOfOper: oPat.pkGradeOfOper

    };
    $.post('/count', {
            'rfArr': pkRfArr.join(),
            'oPatForCounter': JSON.stringify(oPatForCounter),
        },
        function (data) {
            localStorage.setItem('objScalesVTE', data);
            // let fromRfArr = localStorage.getItem('objScalesVTE');
            // let objBallsRiskVTE = JSON.parse(fromRfArr);
            // console.log(objBallsRiskVTE.vCounterPaduaScore);
            // console.log(JSON.parse(data));

            // let objBallsRiskVTE = JSON.parse(localStorage.getItem('objScalesVTE'));
            // localStorage.removeItem('objScalesVTE');
            // console.log(objBallsRiskVTE);
    
        });
        serialObj = JSON.stringify(oPat);
        localStorage.setItem('Patient', serialObj);
        

    $(location).attr('href', '/vte_concl');

}

$('#btnOne').bind('click', countRF);