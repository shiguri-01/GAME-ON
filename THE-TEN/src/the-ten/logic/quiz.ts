import { random } from "../utils/math";
import { calculate3Numbers, type Operation } from "./calculation";

export class MakeTenGameCore {
	private static readonly TARGET_NUMBER = 10;
	readonly question: Question;

	constructor(question: Question) {
		this.question = question;
	}

	checkAnswer(userAnswer: PlayerAnswer): boolean {
		// 同じ演算は使用できないルール
		if (userAnswer.leftOperation === userAnswer.rightOperation) {
			return false;
		}

		const [a, b, c] = this.question;

		const result = calculate3Numbers(
			a,
			b,
			c,
			userAnswer.leftOperation,
			userAnswer.rightOperation,
		);
		return result === MakeTenGameCore.TARGET_NUMBER;
	}

	/**
	 * ランダムなQuizを作成する
	 * @returns ランダムなQuiz
	 */
	static random(): MakeTenGameCore {
		const question = QUESTIONS[Math.floor(random() * QUESTIONS.length)];
		return new MakeTenGameCore(question);
	}

	/**
	 * 重複しない新しいQuizを作成する
	 * @returns 新しいQuiz
	 */
	next(): MakeTenGameCore {
		// 問題が1つしかない場合はそれを返す（重複を許す）
		if (QUESTIONS.length === 1) {
			return new MakeTenGameCore(QUESTIONS[0]);
		}

		let question: Question; // たぶんletで宣言したほうがPicoに優しい
		while (true) {
			question = QUESTIONS[Math.floor(random() * QUESTIONS.length)];

			// 重複しないようにする
			if (question !== this.question) {
				return new MakeTenGameCore(question);
			}
		}
	}
}

export interface PlayerAnswer {
	leftOperation: Operation;
	rightOperation: Operation;
}

export type Question = readonly [number, number, number];

// makeQuestions.tsで生成した問題
// picoで問題を生成すると時間がかかるので、事前に生成しておく
const QUESTIONS: readonly Question[] = [
	[0, 2, 5],
	[0, 5, 2],
	[1, 0, 9],
	[1, 1, 9],
	[1, 2, 8],
	[1, 3, 3],
	[1, 3, 7],
	[1, 4, 6],
	[1, 5, 5],
	[1, 6, 4],
	[1, 7, 3],
	[1, 8, 2],
	[1, 9, 0],
	[1, 9, 1],
	[2, 0, 8],
	[2, 1, 5],
	[2, 1, 8],
	[2, 1, 9],
	[2, 2, 4],
	[2, 2, 6],
	[2, 2, 9],
	[2, 3, 4],
	[2, 4, 2],
	[2, 5, 0],
	[2, 5, 1],
	[2, 6, 2],
	[2, 7, 4],
	[2, 8, 0],
	[2, 8, 1],
	[2, 8, 6],
	[2, 9, 1],
	[2, 9, 8],
	[3, 0, 7],
	[3, 1, 7],
	[3, 1, 8],
	[3, 2, 4],
	[3, 2, 9],
	[3, 3, 1],
	[3, 3, 9],
	[3, 4, 2],
	[3, 5, 5],
	[3, 6, 8],
	[3, 7, 0],
	[3, 7, 1],
	[3, 8, 1],
	[3, 9, 2],
	[4, 0, 6],
	[4, 1, 6],
	[4, 1, 7],
	[4, 2, 2],
	[4, 2, 3],
	[4, 2, 5],
	[4, 2, 8],
	[4, 3, 2],
	[4, 3, 9],
	[4, 4, 6],
	[4, 4, 9],
	[4, 5, 2],
	[4, 6, 0],
	[4, 6, 1],
	[4, 7, 1],
	[4, 8, 2],
	[4, 9, 3],
	[5, 0, 5],
	[5, 1, 2],
	[5, 1, 5],
	[5, 1, 6],
	[5, 2, 0],
	[5, 2, 1],
	[5, 2, 4],
	[5, 2, 7],
	[5, 3, 5],
	[5, 3, 6],
	[5, 3, 8],
	[5, 4, 2],
	[5, 4, 8],
	[5, 4, 9],
	[5, 5, 0],
	[5, 5, 1],
	[5, 5, 9],
	[5, 6, 1],
	[5, 6, 3],
	[5, 7, 2],
	[5, 8, 3],
	[5, 8, 4],
	[5, 9, 4],
	[6, 0, 4],
	[6, 1, 4],
	[6, 1, 5],
	[6, 2, 2],
	[6, 2, 6],
	[6, 2, 7],
	[6, 3, 5],
	[6, 3, 7],
	[6, 3, 8],
	[6, 4, 0],
	[6, 4, 1],
	[6, 4, 8],
	[6, 5, 1],
	[6, 5, 3],
	[6, 5, 9],
	[6, 6, 2],
	[6, 6, 9],
	[6, 7, 3],
	[6, 8, 2],
	[6, 8, 4],
	[6, 9, 5],
	[7, 0, 3],
	[7, 1, 3],
	[7, 1, 4],
	[7, 2, 4],
	[7, 2, 5],
	[7, 3, 0],
	[7, 3, 1],
	[7, 3, 6],
	[7, 4, 1],
	[7, 4, 7],
	[7, 5, 2],
	[7, 5, 8],
	[7, 6, 2],
	[7, 6, 3],
	[7, 6, 9],
	[7, 7, 4],
	[7, 7, 9],
	[7, 8, 5],
	[7, 9, 3],
	[7, 9, 6],
	[8, 0, 2],
	[8, 1, 2],
	[8, 1, 3],
	[8, 2, 0],
	[8, 2, 1],
	[8, 2, 4],
	[8, 2, 6],
	[8, 3, 1],
	[8, 3, 5],
	[8, 4, 2],
	[8, 4, 5],
	[8, 4, 6],
	[8, 4, 8],
	[8, 5, 3],
	[8, 5, 4],
	[8, 5, 7],
	[8, 6, 3],
	[8, 6, 4],
	[8, 6, 8],
	[8, 7, 5],
	[8, 7, 9],
	[8, 8, 4],
	[8, 8, 6],
	[8, 8, 9],
	[8, 9, 7],
	[9, 0, 1],
	[9, 1, 0],
	[9, 1, 1],
	[9, 1, 2],
	[9, 2, 1],
	[9, 2, 2],
	[9, 2, 3],
	[9, 2, 8],
	[9, 3, 2],
	[9, 3, 3],
	[9, 3, 4],
	[9, 3, 7],
	[9, 4, 3],
	[9, 4, 4],
	[9, 4, 5],
	[9, 5, 4],
	[9, 5, 5],
	[9, 5, 6],
	[9, 6, 5],
	[9, 6, 6],
	[9, 6, 7],
	[9, 7, 6],
	[9, 7, 7],
	[9, 7, 8],
	[9, 8, 7],
	[9, 8, 8],
	[9, 8, 9],
	[9, 9, 8],
	[9, 9, 9],
];
