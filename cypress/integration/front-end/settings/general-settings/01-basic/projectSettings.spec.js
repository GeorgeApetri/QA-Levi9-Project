import {createRandomString} from '../../../../../support/utils/utils';
import projectSettingsPage from '../../../../../support/pages/projectSettings';
import loginPage from '../../../../../support/pages/login';

let projectName;
let projectAbbreviation;
let editedName;
let editedAbbreviation;

//Tests for the general settings page.
describe('General settings page tests', () => {
  beforeEach(() => {
    //Create unique test data for tests
    projectName = createRandomString(5);
    projectAbbreviation = createRandomString(3);

    loginPage.login(loginPage.testUsername);
    projectSettingsPage.accessProjectSettings();
  });

  describe('Create tests.', () => {
    afterEach(() => {
      //Clean up
      projectSettingsPage.deleteProject(projectName);
    });

    it('Checks that new project can be added.', () => {
      projectSettingsPage.addProject(projectName, projectAbbreviation);
      projectSettingsPage.checkProjectIsAdded(projectName, projectAbbreviation);
    });

    it('Checks that new project can be added with request validation. (A more advanced example)', () => {
      //open server and capture the POST request
      projectSettingsPage.captureAddProjectRequest();
      projectSettingsPage.addProject(projectName, projectAbbreviation);
      projectSettingsPage.checkProjectIsAdded(projectName, projectAbbreviation);
      //wait for the request and check status code and status message
      projectSettingsPage.checkAddProjectRequestIsSuccessful();
    });

    it.only('Checks that a project can be edited with request validation and check the PUT request to be successful.', () => {
      editedName = createRandomString(5);
      editedAbbreviation = createRandomString(3);

      //open server and capture the PUT request
      projectSettingsPage.captureEditProjectRequest();
      projectSettingsPage.addProject(projectName, projectAbbreviation);
      projectSettingsPage.editProject(projectName, editedName, editedAbbreviation);
      projectName = editedName;
      projectSettingsPage.checkProjectIsAdded(editedName, editedAbbreviation);
      //wait for the request and check status code and status message
      projectSettingsPage.checkEditProjectRequestIsSuccessful();
    });
  });

  it.only('Checks that a project can be edited with request validation and check the PUT request to be successful.', () => {
    editedName = createRandomString(5);
    editedAbbreviation = createRandomString(3);

    //open server and capture the PUT request
    projectSettingsPage.captureEditProjectRequest();
    projectSettingsPage.addProject(projectName, projectAbbreviation);
    projectSettingsPage.editProject(projectName, editedName, editedAbbreviation);
    projectSettingsPage.checkProjectIsAdded(editedName, editedAbbreviation);
    //wait for the request and check status code and status message
    projectSettingsPage.checkEditProjectRequestIsSuccessful();
    projectSettingsPage.deleteProject(editedName);
  });

  it('Checks that new project can be deleted.', () => {
    projectSettingsPage.addProject(projectName, projectAbbreviation);
    projectSettingsPage.deleteProject(projectName);
    projectSettingsPage.checkProjectIsNotVisible(projectName);
  });

  it('Check error message appears when add project request returns 500. (A more advanced example)', () => {
    //open server, capture the POST request and make it return 500.
    projectSettingsPage.captureAddProjectBadRequest();
    projectSettingsPage.addProject(projectName, projectAbbreviation);
    projectSettingsPage.checkProjectIsNotVisible(projectName);
    //chek that an error message is shown to the user that says the project was not added. It will fail because the website doesn't cover this.
    projectSettingsPage.checkProjectWasNotAddedError();
  });

  it('Checks that a project can be edited.', () => {
    editedName = createRandomString(5);
    editedAbbreviation = createRandomString(3);

    projectSettingsPage.addProject(projectName, projectAbbreviation);
    projectSettingsPage.editProject(projectName, editedName, editedAbbreviation);
    projectSettingsPage.checkProjectIsAdded(editedName, editedAbbreviation);
    projectSettingsPage.deleteProject(editedName);
  });

  it('Can access general settings page.', () => {
    projectSettingsPage.visitGeneralSettingsPage();
    projectSettingsPage.checkGeneralSettingsPathUrl();
    projectSettingsPage.checkProjectSettingsTextIsVisible();
    projectSettingsPage.checkAddBtnIsNotDisplayed();
  });

  it('Checks that error messages appear when trying to insert a project name that already exists', () => {
    projectSettingsPage.addProject(projectName, projectAbbreviation);
    cy.wait(3000);
    //Add the same project again
    projectSettingsPage.addProject(projectName, projectAbbreviation);
    projectSettingsPage.checkProjectAlreadyAddedErrorMessage();
    projectSettingsPage.deleteProject(projectName);
  });

  it('Checks that error messages appear when project inputs are empty', () => {
    projectSettingsPage.addProjectWithEmptyFields();
    projectSettingsPage.checkProjectWithEmtyFieldsErrorMessage();
  });

  it('Checks that inputs disappear when pressing the cancel icon', () => {
    projectSettingsPage.cancelAddProject();
    projectSettingsPage.checkAddBtnIsNotDisplayed();
    projectSettingsPage.checkSettingInputIsNotVisible();
  });

  it('Checks that error message appears when project abbreviation is not between 2 and 3 characters', () => {
    projectSettingsPage.checkBoundaryProjectAbbreviationMessageErrors();
  });

  it('Checks that error messages appear when project name is not between 1 and 30 characters', () => {
    projectSettingsPage.checkBoundaryProjectNameMessageErrors();
  });

  it('Checks that when pressing on cancel when deleting a project it closes the modal.', () => {
    projectSettingsPage.addProject(projectName, projectAbbreviation);
    projectSettingsPage.cancelDeleteProject(projectName);
    projectSettingsPage.checkProjectIsAdded(projectName, projectAbbreviation);
    projectSettingsPage.checkDeleteModalIsNotVisible();
    projectSettingsPage.deleteProject(projectName);
  });
});
