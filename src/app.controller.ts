import { Controller, Get, Post, Body, Query, Delete } from '@nestjs/common';
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

  @Post('get-all-issue')
  async getAllIssue(@Body() props: any): Promise<any> {
    let email = props.email;
    let apiToken = props.token;

    const client = new Version3Client({
      host: props.url,
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
    let email = props.email;
    let apiToken = props.token;

    const client = new Version3Client({
      host: props.url,
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
        summary: props.summary,
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
    let email = props.email;
    let apiToken = props.token;

    const client = new Version3Client({
      host: props.url,
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
    let email = props.email;
    let apiToken = props.token;

    const client = new Version3Client({
      host: props.url,
      authentication: {
        basic: {
          email: email,
          apiToken: apiToken,
        },
      },
    });

    const transitions = await client.issues.getTransitions({
      issueIdOrKey: props.key,
    });

    // Find the transition ID for the "Done" status
    const doneTransition = transitions.transitions.find(
      (transition) => transition.to.name === props.status,
    );
    const transitionId = doneTransition.id;

    await client.issues.doTransition({
      issueIdOrKey: props.key,
      transition: {
        id: transitionId,
      },
    });

    return transitionId;
  }

  @Post('get-all-project')
  async testJiraConnect(@Body() props: any): Promise<any> {
    let email = props.email;
    let apiToken = props.token;

    const client = new Version3Client({
      host: props.url,
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

  @Delete('delete-issue')
  async deleteIssue(@Body() props: any): Promise<any> {
    let email = props.email;
    let apiToken = props.token;

    const client = new Version3Client({
      host: props.url,
      authentication: {
        basic: {
          email: email,
          apiToken: apiToken,
        },
      },
    });

    // Specify the issue key or ID to be deleted
    const issueKeyOrId = props.key;

    // Delete the issue
    const deletionResponse = await client.issues.deleteIssue({
      issueIdOrKey: issueKeyOrId,
    });

    // Return the deletion response
    return deletionResponse;
  }

  @Post('get-assigner')
  async getAllUserConnect(@Body() props: any): Promise<any> {
    let email = props.email;
    let apiToken = props.token;

    const client = new Version3Client({
      host: props.url,
      authentication: {
        basic: {
          email: email,
          apiToken: apiToken,
        },
      },
    });

    // get all users
    let users = client.users.getAllUsers();

    // .findAssignableUsers({ project: projectKey })
    // .then((response) => {
    //   const assignableUsers = response.values;
    //   console.log('Assignable Users:', assignableUsers);
    // })
    // .catch((error) => {
    //   console.error('Error finding assignable users:', error);
    // });

    return users;
  }

  @Post('set-assigner')
  async setAssigner(@Body() props: any): Promise<any> {
    let email = props.email;
    let apiToken = props.token;

    const client = new Version3Client({
      host: props.url,
      authentication: {
        basic: {
          email: email,
          apiToken: apiToken,
        },
      },
    });

    // Define the user account ID or email of the assignee
    const assignee = props.assignee; // Replace with the assignee's account ID or email

    // Make the API request to assign the issue
    let res = client.issues
      .assignIssue({ issueIdOrKey: props.key, accountId: assignee })
      .then(() => {
        return true;
        console.log('Issue assigned successfully.');
      })
      .catch((error) => {
        return false;
        console.error('Error assigning issue:', error);
      });

    return res;
  }
}
