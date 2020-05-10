import {createQACustom as qa} from '../utils/utils';
import {createRandomString} from '../utils/utils';
import {chooseRandomFromDropdown} from '../utils/utils';

class Candidates {
  //Locators
  createCandidateButton = qa('createCandidateBtn');
  saveCandidateButton = 'Save candidate';
  cancelCreateCandidateButton = 'Cancel';
  advancedSearchButton = 'Advanced Search';
  createCandidateModal = '#rcDialogTitle0';
  candidateNameInput = '#name';
  candidateSeniorityInput = 'Select Seniority';
  candidateEmailInput = '#email';
  candidateFirstContactDate = 'First contact date';
  candidateLastContactDate = 'Last contact date';
  candidateRecruiter = 'Select recruiter';
  candidateCvSource = 'Select CV source';
  candidateContactStatus = 'Select Contact status';
  candidateRole = 'Select Role';
  candidateExperience = 'Experience (y)';

  //Text utils
  candidatesPath = '/candidates';
  nameWasNotAddedErrorMessage = 'Full name is required.';
  seniorityNotSelectedErrorMessage = 'Seniority is required.';
  emailNotAddedErrorMessage = 'Email is required.';
  recruiterNotSelectedErrorMessage = 'The recruiter is required.';
  firstContactDateNotSelectedErrorMessage = 'First contact date is required.';
  lastContactDateNotSelectedErrorMessage = 'Last contact date is required.';
  cvSourceNotSelectedErrorMessage = 'CV source is required.';
  contactStatusNotSelectedErrorMessage = 'Contact Status is required.';
  roleNotSelectedErrorMessage = 'Role is required.';
  experienceWasNotAddedErrorMessage = 'Experience is required.';

  //Methods
  accesCandidates = () => {
    cy.visit(this.candidatesPath);
  };

  checkCreateCandidatesButton = () => {
    cy.get(this.createCandidateButton)
      .should('be.visible')
      .click();
    cy.get(this.createCandidateModal).should('be.visible');
  };

  checkCancelCreateCandidateButton = () => {
    cy.get(this.createCandidateButton).click();
    cy.get(this.createCandidateModal).should('be.visible');
    cy.contains(this.cancelCreateCandidateButton).click();
    cy.get(this.createCandidateModal).should('not.be.visible');
  };

  checkAdvancedSearchButton = () => {
    cy.contains(this.advancedSearchButton)
      .should('be.visible')
      .click();
    cy.contains('Name').should('be.visible');
  };

  selectSeniority = () => {
    cy.get('#seniorityId').click();
    cy.get('.qa-seniorityIdSelectValue')
      .contains('Senior')
      .click();
  };

  selectRecruiter = () => {
    cy.contains('Select Recruiter').click();
    cy.contains('Dimitrie Matei').click();
  };

  selectCvSource = () => {
    cy.contains('Select CV source').click();
    cy.contains('linkedin').click();
  };

  selectContactStatus = () => {
    cy.contains('Select Contact status').click();
    cy.contains('phone').click();
  };

  selectRole = () => {
    cy.contains('Select Role').click();
    cy.contains('1').click();
  };
  completeCreateCandidateData = (name, email, firstContactDate, lastContactDate, experience) => {
    //Type a candidate name
    cy.get(this.candidateNameInput).type(name);
    //Select seniority
    this.selectSeniority();
    //Type email
    cy.get('#email').type(email);
    //Select recuiter
    this.selectRecruiter();
    //Select first contact date
    cy.get('#firstContactDate').click();
    cy.get('[title="May 1, 2020"]').click();
    //Select last contact date
    cy.get('#lastContactDate').click();
    cy.get('[title="May 4, 2020"]').click();
    //Select CV source
    this.selectCvSource();
    //Select contact status
    this.selectContactStatus();
    //Select role
    this.selectRole();
    //Type experience
    cy.contains('#experience').type(experience);
  };

  addCandidate = (name, email, firstContactDate, lastContactDate, experience) => {
    //Click Create Candidate button
    cy.get(this.createCandidateButton).click();
    //Enter data in form
    this.completeCreateCandidateData(name, email, firstContactDate, lastContactDate, experience);
    //Click on the save button
    cy.get(this.saveCandidateButton).click();
  };

  addCandidateWithEmptyFields = () => {
    //Click Create Candidate button
    cy.get(this.createCandidateButton).click();
    //Click on name and email fields
    cy.get(this.candidateNameInput).click();
    cy.get(this.candidateEmailInput).click();
    //Click on the save button
    cy.contains(this.saveCandidateButton).click();
  };

  checkCandidateWithEmptyfieldsErrorMessage = () => {
    cy.contains(this.nameWasNotAddedErrorMessage)
      .scrollIntoView()
      .should('be.visible');
    cy.contains(this.seniorityNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.emailNotAddedErrorMessage).should('be.visible');
    cy.contains(this.recruiterNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.firstContactDateNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.lastContactDateNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.cvSourceNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.contactStatusNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.roleNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.experienceWasNotAddedErrorMessage).should('be.visible');
  };
}

export default new Candidates();
