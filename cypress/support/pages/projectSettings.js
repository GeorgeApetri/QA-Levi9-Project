import {createQACustom as qa} from '../utils/utils';

class ProjectSettings {
  invalidAbbreviations = ['aa', 'aaaa'];
  invalidNames = ['!', '1234567890123456789012345678901'];

  //Locators
  projectSettingsTitle = 'Project Settings';
  confirmDeleteButton = 'Yes, delete setting';
  closeDeleteButton = 'Close';
  deleteProjectModal = '#rcDialogTitle0';
  tableRow = 'tr';
  addProjectButton = qa('projectsSettingsAddBtn');
  cancelProjectButton = qa('projectsSettingsCancelBtn');
  settingInput = qa('settingsInput');
  confirmProjectButton = qa('projectsSettingsConfirmBtn');
  deleteProjectButton = qa('projectsSettingsDeleteBtn');
  editProjectButton = qa('projectsSettingsEditBtn');

  //Text utils
  projectWasNotAddedErrorMessage = 'Error: project was not added';
  projectAlreadyAddedMessage = 'Project value already exists';
  emptyProjectNameErrorMessage = 'Please enter project name';
  emptyProjectAbbreviationErrorMessage = 'Please enter project abbreviation.';
  abbreviationErrorMessage = 'Abbreviation shoud contain min 2 max 3 letters or digits.';
  nameErrorMessage = 'This input should have between 1 and 30 characters (numbers and/or letters)';

  generalSettingsPath = '/settings/general';
  addProjectRequestObject = {
    method: 'POST',
    url: '**/api/v1/Projects',
  };
  editProjectRequestObject = {
    method: 'PUT',
    url: '**/api/v1/Projects/*',
  };
  addProjectBadRequestObject = {
    method: 'POST',
    url: '**/api/v1/Projects',
    status: 500,
    response: {},
  };
  addProjectRequestAlias = 'postAddProject';
  editProjectRequestAlias = 'putEditProject';
  addProjectBadRequestAlias = 'postAddProjectBadRequest';
  successStatusMessage = '201 (Created)';
  successEditStatusMessage = '204 (No Content)';

  //Methods
  visitGeneralSettingsPage = () => {
    cy.visit(this.generalSettingsPath);
  };

  accessProjectSettings = () => {
    this.visitGeneralSettingsPage();
    cy.contains(this.projectSettingsTitle).click();
  };

  completeProjectData = (name, abbreviation) => {
    //Type a project name
    cy.get(this.settingInput).eq(0).type(name);
    //Type a project abbreviation
    cy.get(this.settingInput).eq(1).type(abbreviation);
  };

  editProjectData = (editedName, editedAbbreviation) => {
    //Type a project name
    cy.get(this.settingInput).eq(0).clear().type(editedName);
    //Type a project abbreviation
    cy.get(this.settingInput).eq(1).clear().type(editedAbbreviation);
  };

  addProject = (name, abbreviation) => {
    //Click on Add button
    cy.get(this.addProjectButton).click();
    this.completeProjectData(name, abbreviation);
    //Click on the confirmation button
    cy.get(this.confirmProjectButton).click();
  };

  cancelAddProject = (name, abbreviation) => {
    //Click on Add button
    cy.get(this.addProjectButton).click();
    //Click on the cancel button
    cy.get(this.cancelProjectButton).click();
  };

  addProjectWithEmptyFields = () => {
    //Click on Add button
    cy.get(this.addProjectButton).click();
    //Click on the confirmation button
    cy.get(this.confirmProjectButton).click();
  };

  editProject = (name, editedName, editedAbbreviation) => {
    //Identify project row & click edit button
    cy.contains(this.tableRow, name).find(this.editProjectButton).click();
    //Edit project data
    this.editProjectData(editedName, editedAbbreviation);
    //Click on the confirmation button
    cy.get(this.confirmProjectButton).click();
  };

  deleteProject = (name) => {
    //Identify project row & click delete button
    cy.contains(this.tableRow, name).find(this.deleteProjectButton).click();
    //Confirm delete
    cy.contains(this.confirmDeleteButton).click();
  };

  cancelDeleteProject = (name) => {
    //Identify project row & click delete button
    cy.contains(this.tableRow, name).find(this.deleteProjectButton).click();
    //Click close
    cy.contains(this.closeDeleteButton).click();
  };

  checkProjectIsAdded = (projectName, projectAbbreviation) => {
    cy.contains(projectName).should('be.visible');
    cy.contains(projectAbbreviation).should('be.visible');
  };

  checkProjectIsNotVisible = (projectName) => {
    cy.contains(projectName).should('not.be.visible');
  };

  checkDeleteModalIsNotVisible = () => {
    //Check that modal has closed
    cy.get(this.deleteProjectModal).should('not.be.visible');
  };

  checkProjectWasNotAddedError = () => {
    cy.contains(this.projectWasNotAddedErrorMessage).should('be.visible');
  };

  checkProjectAlreadyAddedErrorMessage = () => {
    cy.contains(this.projectAlreadyAddedMessage).should('be.visible');
  };

  checkProjectWithEmtyFieldsErrorMessage = () => {
    cy.contains(this.emptyProjectNameErrorMessage).should('be.visible');
    cy.contains(this.emptyProjectAbbreviationErrorMessage).should('be.visible');
  };

  checkBoundaryProjectAbbreviationMessageErrors = () => {
    cy.get(this.addProjectButton).click();
    this.invalidAbbreviations.forEach((invalidAbbreviation) => {
      cy.get(this.settingInput).eq(1).clear().type(invalidAbbreviation);
      cy.contains(this.abbreviationErrorMessage).should('be.visible');
    });
  };

  checkBoundaryProjectNameMessageErrors = () => {
    cy.get(this.addProjectButton).click();
    this.invalidNames.forEach((invalidName) => {
      cy.get(this.settingInput).eq(0).clear().type(invalidName);
      cy.contains(this.nameErrorMessage).should('be.visible');
    });
  };

  checkGeneralSettingsPathUrl = () => {
    cy.url().should('contain', this.generalSettingsPath);
  };

  checkProjectSettingsTextIsVisible = () => {
    cy.contains(this.projectSettingsTitle).should('be.visible');
  };

  checkAddBtnIsNotDisplayed = () => {
    cy.contains(this.addProjectButton).should('not.be.visible');
  };

  checkSettingInputIsNotVisible = () => {
    cy.contains(this.settingInput).should('not.be.visible');
  };

  captureAddProjectRequest = () => {
    cy.server();
    cy.route(this.addProjectRequestObject).as(this.addProjectRequestAlias);
  };

  captureEditProjectRequest = () => {
    cy.server();
    cy.route(this.editProjectRequestObject).as(this.editProjectRequestAlias);
  };

  captureAddProjectBadRequest = () => {
    cy.server();
    cy.route(this.addProjectBadRequestObject).as(this.addProjectBadRequestAlias);
  };

  checkAddProjectRequestIsSuccessful = () => {
    cy.wait(`@${this.addProjectRequestAlias}`).then((xhr) => {
      expect(xhr.status).to.eq(201);
      expect(xhr.statusMessage).to.eq(this.successStatusMessage);
    });
  };

  checkEditProjectRequestIsSuccessful = () => {
    cy.wait(`@${this.editProjectRequestAlias}`).then((xhr) => {
      expect(xhr.status).to.eq(204);
      expect(xhr.statusMessage).to.eq(this.successEditStatusMessage);
    });
  };
}

export default new ProjectSettings();
