# poke-vue - ポケモンステータス計算

[![License](https://img.shields.io/badge/License-Apache%202.0-orange.svg)](https://opensource.org/licenses/Apache-2.0)
![Language](https://img.shields.io/badge/Language-TypeScript-blue)
![Vue.js](https://img.shields.io/badge/-Vue.js-4FC08D.svg?logo=vue.js&style=plastic)

ポケモンのステータスを計算します。  
現在、ポケモン剣盾対応中になります。  
ポケモンのデータは[こちら](https://github.com/kotofurumiya/pokemon_data)からお借りしたものを少しいじっています。

## Demo - やってみた

![Demo](https://github.com/mnrn/poke-vue/blob/master/media/poke-demo.gif)

## Option - 次のようなチェックを施すことができます

- 努力値の余りチェック
  - 残りの努力値を表示します。
- 努力値の無駄チェック
  - 努力値を振った際に無駄がないかチェックします。
- HP が 2n + 1 を満たすかチェック
  - 岩4倍弱点の「ステルスロック」で 2回耐えるかどうかなど
- HP が 2n を満たすかチェック
  - 「オボンのみ」などの回復量が大きくなります。
- HP が 16n - 1 を満たすかチェック
  - 天候ダメージが最小になります。
- HP が 16n + 1 を満たすかチェック
  - 「たべのこし」などの回復量が HP 奇数を満たす中で最大です。
- HP が 16n + 1 ~ 3 を満たすかチェック
  - 「たべのこし」などの回復 4回で「みがわり」 1回分の HP が回復します。
- HP が 4n + 1 を満たすかチェック
  - 「みがわり」 4回ほど使用可能です。
- HP が 6n - 1 を満たすかチェック
  - 「ゴツゴツメット」などのダメージが最小になります。
- HP が 8n - 1 を満たすかチェック
  - 「やどりぎのたね」などのダメージが最小になります。
- HP が 10n - 1 を満たすかチェック
  - 「いのちのたま」の反動ダメージが最小になります。
- 性格補正がかかった箇所が 11n を満たすかチェック
  - 性格補正による数値の上昇の効率が最大になります。
