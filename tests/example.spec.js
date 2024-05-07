// @ts-nocheck
import { allure} from "allure-playwright";
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
const { test, expect } = require('@playwright/test');


test.describe('Demo Test1', () => {
  test('Login saucedemo and validating product', async ({ page }) => {
//step-1 - Navigating to saucedemo website
    await page.goto('https://www.saucedemo.com/');

    
    await expect(page).toHaveTitle("Swag Labs");
    
   
    
    await page.waitForSelector('#login-button')
    //step2 - Logging into application with standard user credentials
    await page.locator('#user-name').type('standard_user');
    
   await page.locator('#password').type('secret_sauce');
    
    await page.locator('#login-button').click();

     //Step3- checking all the products available or not in the application 
    await expect(page.getByText('Products')).toBeVisible();
  //Step-4 Reading or Retrieving the products from csv file
    const records = parse(fs.readFileSync(path.join(__dirname, 'testdata.csv')), {
      columns: true,
      skip_empty_lines: true
    });
    
    for (const record of records) {
      
    
     // Step-5 check all the items are present or not . If product not present throw exception
     
          const element = await page.locator('xpath=//*[text()="'+record.Product1+'"]').textContent();
    
     const element1 = await page.locator('xpath=//*[text()="'+record.Product2+'"]').textContent();
  
     const element2 = await page.locator('xpath=//*[text()="'+record.Product3+'"]').textContent();
     if(element===record.Product1)
      {
        console.log(element+"is available in landing page");
      }
      else
      { 
        console.log(element+"is not available in landing page");
  
      }
  
      if(element1===record.Product2)
        {
          console.log(element1+"is available in landing page");
        }
        else
        { 
          console.log(element1+"is not available in landing page");
  
        }
  
    if(element2===record.Product3)
      {
        console.log(element2+"is available in landing page");
      }
      else
      { 
        console.log(element2+"is not available in landing page");
  
      }
  
    try {
      
      const element3 =  await page.waitForSelector('#MRF',{timeout:5000});
      if(element3){
        console.log('Element found')
      }
          else{
            console.log('Element not found');
          }
        
    } catch (error) {
    
      console.log(record.Product4+"is not available in landing page");
      
    }  
   
    
        
    
     
     
    }
    
  


  }
);
}
);

//Step-6  processing the application and Implementation of test case function
test.describe('Demo Test', () => {

 test('Login to saucedemo and finish the process', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveTitle("Swag Labs");
  
 
  
  await page.waitForSelector('#login-button')
  
  await page.locator('#user-name').type('standard_user');
  
 await page.locator('#password').type('secret_sauce');
  
  await page.locator('#login-button').click();
  await expect(page.getByText('Products')).toBeVisible();


  

  await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('xpath=//*[@id="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  
  await page.waitForTimeout(3000);
  await page.locator('xpath=//*[text()="Sauce Labs Bolt T-Shirt"]').click();
    

  await page.locator('.shopping_cart_link').click();

  await page.waitForTimeout(3000);
  await page.locator('xpath=//*[@id="remove-sauce-labs-bike-light"]').click();
  await page.locator('#checkout').click();
  await page.waitForTimeout(3000);
  await page.locator('#first-name').type("TEST")
  await page.locator('#last-name').type("test2")
  await page.locator('#postal-code').type("1234")
  await page.waitForTimeout(3000);
  await page.locator('#continue').click();
  await page.waitForTimeout(3000);
  await page.locator('xpath=//*[text()="Sauce Labs Bolt T-Shirt"]').click();
  await page.waitForTimeout(3000);
  await page.locator('.shopping_cart_link').click();
  
  await page.locator('#checkout').click();

  await page.locator('#first-name').type("TEST3")
  await page.locator('#last-name').type("test4")
  await page.locator('#postal-code').type("12345")
  
  await page.locator('#continue').click();


  const total = await page.locator(".summary_total_label").textContent();
  console.log("Total price: "+total);
  // @ts-ignore
  const a=total.split("$",2);
  console.log(a[1]);
  if( parseInt(a[1]) <40)
    {
      await page.locator('#finish').click();
      const header =await  page.locator(".complete-header").textContent();
      if(header=="Thank you for your order!")
        {
          console.log(header);
        }
        await page.locator('#back-to-products').click();
      
    }
    else{
      await page.locator('#cancel').click();
    }

    await page.locator("xpath=//button[text()='Open Menu']").click();
    await page.locator("xpath=//a[text()='Logout']").click();



  
  

  
  

  
});

});