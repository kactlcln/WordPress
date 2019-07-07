// じゃんけんの手の情報
var handtypes = [
    {
        'id': 'rock',
        'text': 'グー',
        'win': 'scissors',
        'lose': 'paper'
    }, {
        'id': 'paper',
        'text': 'パー',
        'win': 'rock',
        'lose': 'scissors'
    }, {
        'id': 'scissors',
        'text': 'チョキ',
        'win': 'paper',
        'lose': 'rock'
    }
];

// 使用するクラス名
var btnWrapperClass = 'game-control'; // ボタンを格納する要素
var btnClass = 'game-control_btn'; // ボタンに設定するclass
var resultClass = 'result_box'; // じゃんけんの結果を表示する要素
var resultPlayerClass = 'result_player'; // プレイヤーの出した手を表示する要素
var resultCpuClass = 'result_cpu'; // CPUの出した手を表示する要素

$(function() {
    // ボタンの設置
    for (var i = 0; i < handtypes.length; i++) {
        var btn = $('<button>')
            .addClass(btnClass)
            .attr('data-choice', handtypes[i]['id'])
            .text(handtypes[i]['text']);
        $('.' + btnWrapperClass).append(btn);
    }

    // ボタン選択時
    $(document).on('click', '.' + btnClass, function() {
        // プレイヤーの出した手を取得
        for (var i = 0; i < handtypes.length; i++) {
            if (handtypes[i]['id'] === $(this).data('choice')) {
                var playerHand = JSON.parse(JSON.stringify(handtypes[i]));
            }
        }
        // CPUの出した手を取得
        var cpuHand = choose_at_random(handtypes);

        // じゃんけんの結果を判定
        var result = judge_rock_paper_scissors(playerHand, cpuHand);

        // 結果をブラウザに反映
        $('.' + resultPlayerClass).text(playerHand['text']);
        $('.' + resultCpuClass).text(cpuHand['text']);
        $('.' + resultClass).text(result);
    });
});

/**
 * じゃんけんの結果を返す
 * @param {object} player - プレイヤーの出した手の情報
 * @param {object} cpu    - CPUの出した手の情報
 */
function judge_rock_paper_scissors(player, cpu) {
    // 勝ちの場合
    if(player['win'] === cpu['id']) {
        return '勝ち';
    // 負けの場合
    } else if(player['lose'] === cpu['id']) {
        return '負け';
    // あいこの場合
    } else {
        return 'あいこ';
    }
}

/**
 * 配列の値からランダムで1つ選択して返す
 * @param {array} arrayData - 選択する配列の内容
 */
function choose_at_random(arrayData) {
    var arrayIndex = Math.floor(Math.random() * arrayData.length);
    return arrayData[arrayIndex];
}
