interface IQuestionFilter {
  page: number;
  pageSize: number;
  program: string; // CSE or Education
  major: string; // General Education, English, Mathematics, etc. (for Education program)
  coverage: string[]; // Literature

}

export class QuestionFilter implements IQuestionFilter {
  program: string;
  page: number;
  pageSize: number;
  major: string;
  coverage: string[];

  constructor(program: string = '', page: number = 1, pageSize: number = 25, major: string = '', coverage: string[] = []) {
    this.program = program;
    this.page = page;
    this.pageSize = pageSize;
    this.major = major;
    this.coverage = coverage;
  }
}

