$(document).ready(function () {
    objDrugsList = {
        'Enoxaparin sodium': {
            pair: {
                'Enoxaparin sodium': 'Эноксапарин натрия'
            },
            'singleProphDose': 40,
            delivery: 'п/к',
            container: 'шприц',
            timesADay: 1,
            drugs: {
                Anfibra: {
                    nameCyr: 'Анфибра',
                    nameLat: 'Anfibra',
                    officDose: [0.2, 0.4, 0.6, 0.8, 1, ],
                },
                Hemapaxan: {
                    nameCyr: 'Гемапаксан',
                    nameLat: 'Hemapaxan',
                    officDose: [0.4],
                },
                Clexane: {
                    nameCyr: 'Клексан',
                    nameLat: 'Clexane',
                    officDose: [0.2, 0.4, 0.6, 0.8, 1, ],
                },
                'Flenox Neo': {
                    nameCyr: 'Фленокс НЕО',
                    nameLat: 'Flenox Neo',
                    officDose: [0.2, 0.4, 0.6, 0.8, 1, ],
                },
                Enixum: {
                    nameCyr: 'Эниксум',
                    nameLat: 'Enixum',
                    officDose: [0.2, 0.4, 0.6, 0.8, 1, ],
                },
                'Enoxaparin sodium': {
                    nameCyr: 'Эноксапарин натрия',
                    nameLat: 'Enoxaparin sodium',
                    officDose: [0.2, 0.3, 0.4, 0.6, 0.8, 1, ],
                },
                'Enoxaparin Binergia': {
                    nameCyr: 'Эноксапарин-Бинергия',
                    nameLat: 'Enoxaparin Binergia',
                    officDose: [0.2, 0.4, 0.6, 0.8, 1, ],
                }
            }
        },
        'Nadroparin calcium': {
            pair: {
                'Nadroparin calcium': 'Надропарин кальция'
            },
            'singleProphDose': 0.4,
            delivery: 'п/к',
            container: 'шприц',
            timesADay: 1,
            drugs: {
                Fraxiparine: {
                    nameCyr: 'Фраксипарин',
                    nameLat: 'Fraxiparine',
                    officDose: [0.3, 0.4, 0.6, 0.8, 1, ],
                },
                'Fraxiparine Forte': {
                    nameCyr: 'Фраксипарин Форте',
                    nameLat: 'Fraxiparine Forte',
                    officDose: [0.6, 0.8, 1, ],
                }
            }
        },
        'Bemiparinum natrium': {
            pair: {
                'Bemiparinum natrium': 'Бемипарин натрия'
            },
            'singleProphDose': 3500,
            delivery: 'п/к',
            container: 'шприц',
            timesADay: 1,
            drugs: {
                'Zibor 2500': {
                    nameCyr: 'Цибор 2500',
                    nameLat: 'Zibor 2500',
                    officDose: [2500],
                },
                'Zibor 3500': {
                    nameCyr: 'Цибор 3500',
                    nameLat: 'Zibor 3500',
                    officDose: [3500],
                }
            }
        },
        'Heparin sodium': {
            pair: {
                'Heparin sodium': 'Гепарин натрия'
            },
            'singleProphDose': 5000,
            delivery: 'п/к',
            container: 'амп.',
            timesADay: 3,
            drugs: {
                Heparinum: {
                    nameCyr: 'Гепарин',
                    nameLat: 'Heparinum',
                    officDose: [5000],
                },
                'Heparinum natrium': {
                    nameCyr: 'Гепарин натрия',
                    nameLat: 'Heparinum natrium',
                    officDose: [5000],
                }
            }
        },
        'Fondaparinux sodium': {
            pair: {
                'Fondaparinux sodium': 'Фондапаринукс натрия'
            },
            'singleProphDose': 0.5,
            delivery: 'п/к',
            container: 'шприц',
            timesADay: 1,
            drugs: {
                Arixrta: {
                    nameCyr: 'Арикстра',
                    nameLat: 'Arixrta',
                    officDose: [0.5, 1, ],
                }
            }
        },
        'Acetylsalicylic acid': {
            pair: {
                'Acetylsalicylic acid': 'Ацетилсалициловая кислота'
            },
            'singleProphDose': 100,
            delivery: 'внутрь',
            container: 'таб.',
            timesADay: 1,
            drugs: {
                'Acetylsalicylic acid': {
                    nameCyr: 'Ацетилсалициловая кислота',
                    nameLat: 'Acetylsalicylic acid',
                    officDose: [500],
                },

                'Aspirin Cardio': {
                    nameCyr: 'Аспирин кардио',
                    nameLat: 'Aspirin Cardio',
                    officDose: [100, 300],
                },

                'ASK-cardio': {
                    nameCyr: 'АСК-кардио',
                    nameLat: 'ASK-cardio',
                    officDose: [100],
                },

                Acecardol: {
                    nameCyr: 'Ацекардол',
                    nameLat: 'Acecardol',
                    officDose: [50, 100, 300],
                },

                Trombopol: {
                    nameCyr: 'Тромбопол',
                    nameLat: 'Trombopol',
                    officDose: [75, 175],
                },

                Sanovasc: {
                    nameCyr: 'Сановаск',
                    nameLat: 'Sanovasc',
                    officDose: [50, 75, 100],
                },

                'Thrombo ASS': {
                    nameCyr: 'Тромбо АСС',
                    nameLat: 'Thrombo ASS',
                    officDose: [50, 100],
                },

                CardiASK: {
                    nameCyr: 'КардиАСК',
                    nameLat: 'CardiASK',
                    officDose: [50, 100, 300],
                },

                Aspicor: {
                    nameCyr: 'Аспикор',
                    nameLat: 'Aspicor',
                    officDose: [100],
                },

                'Upsarin UPSA': {
                    nameCyr: 'Упсарин УПСА',
                    nameLat: 'Upsarin UPSA',
                    officDose: [500],
                }
            }
        },
        'Dabigatran etexilate': {
            pair: {
                'Dabigatran etexilate': 'Дабигатрана этексилат'
            },
            'singleProphDose': 150,
            delivery: 'внутрь',
            container: 'капс.',
            timesADay: 2,
            drugs: {
                Pradaxa: {
                    nameCyr: 'Прадакса',
                    nameLat: 'Pradaxa',
                    officDose: [75, 150],
                }
            }
        },
        'Rivaroxaban': {
            pair: {
                'Rivaroxaban': 'Ривароксабан'
            },
            'singleProphDose': 20,
            delivery: 'внутрь',
            container: 'таб.',
            timesADay: 1,
            drugs: {
                Xarelto: {
                    nameCyr: 'Ксарелто',
                    nameLat: 'Xarelto',
                    officDose: [2.5, 10, 15, 20],
                }
            }
        },
        'Apixaban': {
            pair: {
                'Apixaban': 'Апиксабан'
            },
            'singleProphDose': 2.5,
            delivery: 'внутрь',
            container: 'таб.',
            timesADay: 1,
            drugs: {
                Eliquis: {
                    nameCyr: 'Эликвис',
                    nameLat: 'Eliquis',
                    officDose: [2.5, 5],
                }
            }
        },
        'Edoxaban': {
            pair: {
                'Edoxaban': 'Эдоксабан'
            },
            'singleProphDose': 60,
            delivery: 'внутрь',
            container: 'таб.',
            timesADay: 1,
            drugs: {
                Lixiana: {
                    nameCyr: 'Ликсиана',
                    nameLat: 'Lixiana',
                    officDose: [15, 30, 60],
                }
            }
        },
        'Warfarin': {
            pair: {
                'Warfarin': 'Варфарин'
            },
            'singleProphDose': 5.0,
            delivery: 'внутрь',
            container: 'таб.',
            timesADay: 1,
            drugs: {
                Warfarex: {
                    nameCyr: 'Варфарекс',
                    nameLat: 'Warfarex',
                    officDose: [1, 3, 5],
                },
                Warfarin: {
                    nameCyr: 'Варфарин',
                    nameLat: 'Warfarin',
                    officDose: [2.5],
                },
                Warfarin: {
                    nameCyr: 'Варфарин Канон',
                    nameLat: 'Warfarin',
                    officDose: [2.5],
                },
                'Warfarin Nycomed': {
                    nameCyr: 'Варфарин Никомед',
                    nameLat: 'Warfarin Nycomed',
                    officDose: [2.5],
                },
                'Warfarin-OBL': {
                    nameCyr: 'Варфарин-OBL',
                    nameLat: 'Warfarin-OBL',
                    officDose: [2.5],
                }
            },
        }
    },
    objChoosedDrug = {
        titleCyr: '',
        titleLat: '',
        officDose: {},
        numberOfOfficDose: 1,
        frequencyOfDrugTaking: 'сут.'
    };
});