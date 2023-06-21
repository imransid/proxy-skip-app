import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Version3Client } from 'jira.js';
import { TrelloClient } from 'trello.js';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getJira(): any {
    return this.appService.getJira();
  }

  @Post()
  createIssue(@Body() createData: object): any {
    return this.appService.createIssue(createData);
  }

  @Get('get-all-issue')
  async getAllIssue(@Body() props: any): Promise<any> {
    let host = 'https://pm23.atlassian.net';
    let email = 'Minhazul.Hasan@brainstation-23.com';
    let apiToken =
      'ATATT3xFfGF05HZoqPQ0ZjhHjze6RGAsPhH3rq5I_1Iv8Ykh8t2D7Nw4wpihOjRN_DtF9JDHGrdFJmRqPPEmEviVlKcDOUKN_XSu11ewD0mp_bge176xIfe3uiygrH49_1-aL-GTqHEI3vH8rQDqflXJvOjD7x4F3_1Z5OO3721D3chh6nnyFfY=F30F0A40';

    const client = new Version3Client({
      host: 'https://ari-us.atlassian.net/',
      authentication: {
        basic: {
          email: email,
          apiToken: apiToken,
        },
      },
    });

    const { issues } = await client.issueSearch.searchForIssuesUsingJql({
      jql: `project=${props.key}`,
    });

    return issues;
  }

  @Post('create-issue')
  async createProjectIssue(@Body() props: any): Promise<any> {
    let email = 'Minhazul.Hasan@brainstation-23.com';
    let apiToken =
      'ATATT3xFfGF05HZoqPQ0ZjhHjze6RGAsPhH3rq5I_1Iv8Ykh8t2D7Nw4wpihOjRN_DtF9JDHGrdFJmRqPPEmEviVlKcDOUKN_XSu11ewD0mp_bge176xIfe3uiygrH49_1-aL-GTqHEI3vH8rQDqflXJvOjD7x4F3_1Z5OO3721D3chh6nnyFfY=F30F0A40';

    const client = new Version3Client({
      host: 'https://ari-us.atlassian.net/',
      authentication: {
        basic: {
          email: email,
          apiToken: apiToken,
        },
      },
    });

    // create Issue
    const { id } = await client.issues.createIssue({
      fields: {
        summary: 'My first issue',
        issuetype: {
          name: 'Task',
        },
        project: {
          key: props.key,
        },
      },
    });

    const issue = await client.issues.getIssue({ issueIdOrKey: id });

    return issue;
  }

  @Post('update-issue')
  async updateProjectIssue(@Body() props: any): Promise<any> {
    let email = 'Minhazul.Hasan@brainstation-23.com';
    let apiToken =
      'ATATT3xFfGF05HZoqPQ0ZjhHjze6RGAsPhH3rq5I_1Iv8Ykh8t2D7Nw4wpihOjRN_DtF9JDHGrdFJmRqPPEmEviVlKcDOUKN_XSu11ewD0mp_bge176xIfe3uiygrH49_1-aL-GTqHEI3vH8rQDqflXJvOjD7x4F3_1Z5OO3721D3chh6nnyFfY=F30F0A40';

    const client = new Version3Client({
      host: 'https://ari-us.atlassian.net/',
      authentication: {
        basic: {
          email: email,
          apiToken: apiToken,
        },
      },
    });

    const updatedIssue = await client.issues.editIssue({
      issueIdOrKey: props.id,
      fields: {
        summary: props.summary,
        description: props.description,
      },
    });

    return updatedIssue;
  }

  @Post('change-issue-status')
  async changeIssueStatus(@Body() props: any): Promise<any> {
    let host = 'https://pm23.atlassian.net';
    let email = 'Minhazul.Hasan@brainstation-23.com';
    let apiToken =
      'ATATT3xFfGF05HZoqPQ0ZjhHjze6RGAsPhH3rq5I_1Iv8Ykh8t2D7Nw4wpihOjRN_DtF9JDHGrdFJmRqPPEmEviVlKcDOUKN_XSu11ewD0mp_bge176xIfe3uiygrH49_1-aL-GTqHEI3vH8rQDqflXJvOjD7x4F3_1Z5OO3721D3chh6nnyFfY=F30F0A40';

    const client = new Version3Client({
      host: 'https://ari-us.atlassian.net/',
      authentication: {
        basic: {
          email: email,
          apiToken: apiToken,
        },
      },
    });

    const transitions = await client.issues.getTransitions({
      issueIdOrKey: props.id,
    });

    // Find the transition ID for the "Done" status
    const doneTransition = transitions.transitions.find(
      (transition) => transition.to.name === props.status,
    );
    const transitionId = doneTransition.id;

    await client.issues.doTransition({
      issueIdOrKey: props.id,
      transition: {
        id: transitionId,
      },
    });

    return transitionId;
  }

  @Post('get-all-project')
  async testJiraConnect(): Promise<any> {
    let host = 'https://pm23.atlassian.net';
    let email = 'Minhazul.Hasan@brainstation-23.com';
    let apiToken =
      'ATATT3xFfGF05HZoqPQ0ZjhHjze6RGAsPhH3rq5I_1Iv8Ykh8t2D7Nw4wpihOjRN_DtF9JDHGrdFJmRqPPEmEviVlKcDOUKN_XSu11ewD0mp_bge176xIfe3uiygrH49_1-aL-GTqHEI3vH8rQDqflXJvOjD7x4F3_1Z5OO3721D3chh6nnyFfY=F30F0A40';

    const client = new Version3Client({
      host: 'https://ari-us.atlassian.net/',
      authentication: {
        basic: {
          email: email,
          apiToken: apiToken,
        },
      },
    });

    // get all
    const projects = await client.projects.getAllProjects();

    // get 1
    // const project = await client.projects.getProject({
    //   projectIdOrKey: projects[1].id.toString(),
    // });
    return projects;
  }
}
