from tests_functions.helpers_functions import fill_form
from time import sleep


def update_recipe(driver, By):
    plus_one_button = driver.find_element(
        By.XPATH, '/html/body/div[1]/form/div/div[2]/button')

    plus_one_button.click()
    plus_one_button.click()

    fill_form(driver, By)

    send_update_button = driver.find_element(
        By.XPATH, '/html/body/div[1]/form/div/button')

    send_update_button.click()
