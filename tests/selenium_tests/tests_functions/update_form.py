from tests_functions.helpers_functions import fill_form
from time import sleep


def update_recipe(driver, By):
    update_recipe_button = driver.find_element(
        By.XPATH, "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[2]/button[2]")
    update_recipe_button.click()
    sleep(2)

    fill_form(driver, By)

    send_update_button = driver.find_element(
        By.XPATH, '/html/body/div[1]/form/div/button')

    send_update_button.click()
