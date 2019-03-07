package com.easypoint.point.api;

import com.easypoint.point.MvcContextIntegrationTest;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class AuthIntegrationTest extends MvcContextIntegrationTest {

    /**
     * PUT /auth
     */
    @Test
    public void testAuthControllerSignInSuccessful() throws Exception {
        Map req = new HashMap();

        req.put("username", "suporte@ponto.com");
        req.put("password", "radio@TV");
        // When
        this.mockMvc.perform(put("/api/auth")
                .accept(APPLICATION_JSON)
                .contentType(APPLICATION_JSON)
                .content(json(req)))

		.andDo(print()) // debug

                // Then
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"));
    }

    /**
     * PUT /auth
     */
    @Test
    public void testAuthControllerSignInFail() throws Exception {
        Map req = new HashMap();

        req.put("username", "suporte1@ponto.com");
        req.put("password", "radio@TV");
        // When
        this.mockMvc.perform(put("/api/auth")
                .accept(APPLICATION_JSON)
                .contentType(APPLICATION_JSON)
                .content(json(req)))

                .andDo(print()) // debug

                // Then
                .andExpect(status().isUnauthorized());
    }
}
