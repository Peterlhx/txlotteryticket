export const data = {
	detail: [
		{
			name: '复式投注幸运号码',
			router: 'doubleBetting1',
			count: 7,                // 号码个数
			numRange: [1, 33],       // 号码范围  
			specialRange: [1, 16],   // 特殊号码范围
			periods: 14134,          // 期数
			lotteryTime: '周二21:30', // 开奖时间
			pickType: 'random',      // 选择方式
			isRecommend: true,       // 是否推荐
			bonusPool: 1107680000
		}, 
		{
			name: '复式投注幸运号码2',
			router: 'doubleBetting2',
			count: 11,
			numRange: [1, 16],
			periods: 14134,
			lotteryTime: '周二21:30',
			pickType: 'custom',
			isRecommend: true,
			bonusPool: 7680000
		},
		{
			name: '粤11选5任二幸运号',
			router: 'elevenPickFive',
			count: 2,
			numRange: [1, 11],
			periods: 14134,
			lotteryTime: '周二21:30',
			pickType: 'random',
			isRecommend: false,
			bonusPool: 1107680000
		},
		{
			name: '福彩3D直选幸运号',
			router: 'lottery3D',
			count: 3,
			numRange: [0, 9],
			periods: 14134,
			lotteryTime: '周二21:30',
			pickType: 'random',
			isRecommend: false,
			countUnits: ['百', '十', '个'],
			bonusPool: 6800
		},
		{
			name: '排5直选',
			router: 'sortFive',
			count: 5,
			numRange: [0, 9],
			periods: 14134,
			lotteryTime: '周二21:30',
			pickType: 'random',
			isRecommend: false,
			countUnits: ['万', '千', '百', '十', '个'],
			bonusPool: 1107680000
		}
	],
	betAmount: [10, 20, 30],
	ruleInfo: '规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明'
}